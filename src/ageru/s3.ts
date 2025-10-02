import 'dotenv/config'

import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { CreateBucketCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { z } from 'astro/zod'
import { directory, sagasu } from './files'
import { tsukuru } from 'idtsukuru'

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

export async function s3(s?: string) {
  if (s === 'create') {
    await createBucket(bucket)
  } else {
    const kizis = await sagasu('.', '../content/kiroku', 'mdx')
    const tags = await sagasu('.', '../content/tags', 'json')
    await kaku(kizis, bucket, 'text/markdown', 'kizis.json', 'text')
    await kaku(tags, bucket, 'application/json', 'tags.json', 'text')
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

// let list = { paths: [] as { id: string, ki: string}[] }

async function kaku(kizis: string[], bucket: string, ctype: string, john: string, ist: 'text' | 'binary') {
  let list: { paths: string[] } = {
    paths: []
  }
  for (const kizi of kizis) {
    const nakami = await read(kizi)
    const hash = createHash('sha256').update(nakami).digest('hex')
    const sonzai = await getObject(bucket, kizi)
    list.paths.push(kizi)
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
  }
  const json = JSON.stringify(list, null, 2)
  await putObject(bucket, john, json, 'application/json')
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
