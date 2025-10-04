import 'dotenv/config'

// import { reference, z } from 'astro:content'
// import { env } from 'cloudflare:workers'
import { Sha256 } from '@aws-crypto/sha256-js'
import { HttpRequest } from '@smithy/protocol-http'
import { SignatureV4 } from '@smithy/signature-v4'
import { Hono } from 'hono'

const env = process.env

const app = new Hono()

app.get('/', (c) => {
  return c.text('S3（R2互換、Localstack）とのファイルの通信\nURLにファイル名を書いてアクセスする')
})

app.get('/:name', async (c) => {
  const id = c.req.param('name')
  const res = await getk(id)
  if (res.status === 404) {
    return c.text('その名前のファイルは存在しないみたい', 404)
  } else if (!res.ok) {
    return c.text('何かがおかしいね', 500)
  } else {
    return res
  }
})

export default app

export async function getk(ps: string) {
  return await kiziloader({ john: ps })
}

// return await kiziloader({ john: 'f1906c5ce3', ctype: 'text/markdown; charset=utf-8' })

// JSON 'application/json'
// MD 'text/markdown; charset=utf-8'

// ${env.LOCALSTACK_ENDPOINT}/${env.BUCKET_NAME}/kizis.json
// content collection データを return で返す、眠いから一旦寝る 13:09

// 独自のloaderを作る 22:37
// これは非常に厳しい戦いになりそうだ

// 22:52 john というのは json name のことで、私は json をジョンソンと呼んでいる

const kiziloader = async (options: { john: string }) => {
  return await kiziload(options.john)
}

const kiziload = async (john: string) => {
  const request = new HttpRequest({
    protocol: 'http:',
    hostname: env.ENDPOINT_NOT_LOCALHOST,
    method: 'GET',
    path: `/${env.BUCKET_NAME}/${john}`,
    headers: {
      host: env.ENDPOINT_NOT_LOCALHOST,
    },
  })
  const signed = await signer.sign(request)
  const url = `${signed.protocol}//${signed.hostname}${signed.path}`
  try {
    const res = await fetch(url, {
      headers: signed.headers as Record<string, string>,
    })
    if (!res.ok) {
      return new Response(`error: ${res.statusText}`, {
        status: res.status,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })
    }
    const ctx = await res.text()
    return new Response(ctx, {
      status: 200,
      headers: { 'content-type': res.headers.get('content-type') || 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    return new Response(String(err), {
      status: 404,
    })
  }
}

const signer = new SignatureV4({
  service: 's3',
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  sha256: Sha256,
})
