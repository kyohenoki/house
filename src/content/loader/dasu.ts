// import { reference, z } from 'astro:content'

import { Sha256 } from '@aws-crypto/sha256-js'
import { HttpRequest } from '@smithy/protocol-http'
import { SignatureV4 } from '@smithy/signature-v4'

export async function getk(ps: string, envs: Envs) {
  return await kiziloader({ john: ps, envs })
}

// return await kiziloader({ john: 'f1906c5ce3', ctype: 'text/markdown; charset=utf-8' })

// JSON 'application/json'
// MD 'text/markdown; charset=utf-8'

// ${env.LOCALSTACK_ENDPOINT}/${env.BUCKET_NAME}/kizis.json
// content collection データを return で返す、眠いから一旦寝る 13:09

// 独自のloaderを作る 22:37
// これは非常に厳しい戦いになりそうだ

// 22:52 john というのは json name のことで、私は json をジョンソンと呼んでいる

const kiziloader = async (options: { john: string; envs: Envs }) => {
  return await kiziload(options.john, options.envs)
}

export type Envs = {
  LOCALSTACK_ENDPOINT: string
  ENDPOINT_NOT_LOCALHOST: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWS_REGION: string
  BUCKET_NAME: string
}

const kiziload = async (john: string, env: Envs) => {
  const request = new HttpRequest({
    protocol: 'http:',
    hostname: env.ENDPOINT_NOT_LOCALHOST,
    method: 'GET',
    path: `/${env.BUCKET_NAME}/${john}`,
    headers: {
      host: env.ENDPOINT_NOT_LOCALHOST,
    },
  })
  const signer = new SignatureV4({
    service: 's3',
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
    sha256: Sha256,
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
