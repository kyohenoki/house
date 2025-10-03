import 'dotenv/config'

import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { CreateBucketCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { z } from 'astro/zod'
import { tsukuru } from 'idtsukuru'
import { directory, sagasu } from './files'

const Envs = z.object({
  LOCALSTACK_ENDPOINT: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  BUCKET_NAME: z.string(),
})

const env = Envs.parse(process.env)

const client = new S3Client({
  endpoint: env.LOCALSTACK_ENDPOINT,
  region: env.AWS_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

const bucket = env.BUCKET_NAME

async function createBucket(name: string) {
  try {
    await client.send(
      new CreateBucketCommand({
        Bucket: name,
      })
    )
    console.log(`${name} is created`)
  } catch (err) {
    console.log(err)
  }
}

async function upload() {
  const kizis = await sagasu('.', '../content/kiroku', 'mdx')
  const tags = await sagasu('.', '../content/tags', 'json')
  await kaku(kizis, bucket, 'text/markdown', 'mdx', 'kizis.json', 'text')
  await kaku(tags, bucket, 'application/json', 'json', 'tags.json', 'text')
}

export async function s3(s?: string) {
  if (s === 'create') {
    await createBucket(bucket)
  } else if (s === 'upload') {
    await upload()
  } else {
    await createBucket(bucket)
    await upload()
  }
}

async function read(filename: string) {
  const filepath = path.join(directory, filename)
  return await readFile(filepath, 'utf-8')
}

async function putObject(name: string, key: string, nakami: string, ctype: string) {
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: name,
        Key: key,
        Body: nakami,
        ContentType: ctype,
      })
    )
    console.log(`${key} was put in the database`)
  } catch (err) {
    console.log(err)
  }
}

async function kaku(kizis: string[], bucket: string, ctype: string, ext: string, john: string, ist: 'text' | 'binary') {
  let list = { paths: [] as { key: string; name: string }[] }
  const kizon = await hairetsu(bucket, john)
  let count = 0
  while (kizis.length > count) {
    const nakami = await read(kizis[count])
    let kizi = `${tsukuru({
      mozi: '16',
      nagasa: 10,
    })}.${ext}`
    if (typeof kizon !== 'undefined') {
      kizi = kizon.paths[count].key
    }
    const hash = createHash('sha256').update(nakami).digest('hex')
    const sonzai = await getObject(bucket, kizi)
    list.paths.push({ key: kizi, name: kizis[count] })
    if (typeof sonzai === 'string') {
      await putObject(bucket, kizi, nakami, ctype)
    } else {
      const content = istreturn(await sonzai.Body!.transformToByteArray(), ist)
      const hashtw = createHash('sha256').update(content).digest('hex')
      if (hash === hashtw) {
        console.log('no change')
      } else {
        await putObject(bucket, kizi, nakami, ctype)
      }
    }
    count += 1
  }
  const json = JSON.stringify(list, null, 2)
  await putObject(bucket, john, json, 'application/json')
}

async function hairetsu(bucket: string, john: string) {
  const retsu = await getObject(bucket, john)
  if (typeof retsu !== 'string') {
    const by = istreturn(await retsu.Body!.transformToByteArray(), 'text')
    if (typeof by === 'string') {
      const ure: Ure = JSON.parse(by)
      return ure
    }
  }
}

type Ure = {
  paths: {
    key: string
    name: string
  }[]
}

async function getObject(name: string, key: string) {
  try {
    return await client.send(
      new GetObjectCommand({
        Bucket: name,
        Key: key,
      })
    )
  } catch (err) {
    return String(err)
  }
}

function istreturn(by: Uint8Array<ArrayBufferLike>, ist: 'text' | 'binary') {
  if (ist === 'text') {
    return new TextDecoder('utf-8').decode(by)
  } else {
    return by
  }
}
