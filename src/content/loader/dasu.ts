// import { reference, z } from 'astro:content'
import { env } from 'cloudflare:workers'
import { Sha256 } from '@aws-crypto/sha256-js'
import { HttpRequest } from '@smithy/protocol-http'
import { SignatureV4 } from '@smithy/signature-v4'

export default {
  async fetch() {
    return await getk()
  },
}

export async function getk() {
  return await kiziloader({ john: 'kizis.json' })
}

// ${env.LOCALSTACK_ENDPOINT}/${env.BUCKET_NAME}/kizis.json
// content collection データを return で返す、眠いから一旦寝る 13:09

// 独自のloaderを作る 22:37
// これは非常に厳しい戦いになりそうだ

// 22:52 john というのは json name のことで、私は json をジョンソンと呼んでいる

const kiziloader = async (options: { john: string }) => {
  // const schema = kizischema
  return await kiziload(options.john)
}

/*
const kizischema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.string(),
  daowari: z.string(),
  update: z.string(),
  upowari: z.string(),
  tags: z.array(reference('tags')),
})
  */

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
    const ctx = await res.text()
    return new Response(ctx, {
      status: 200,
      headers: { "content-type": "application/json" }
    })
  } catch (err) {
    return new Response(String(err), {
      status: 404
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
