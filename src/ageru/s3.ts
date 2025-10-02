import 'dotenv/config'

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { CreateBucketCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { z } from 'astro/zod'
import { directory } from './files'

const Envs = z.object({
  LOCALSTACK_ENDPOINT: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
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

const bucket = 'kiroku'

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
    await upload('../content/kiroku/ooo.mdx', 'text/markdown')
  }
}

async function upload(filename: string, type: string) {
  const filepath = path.join(directory, filename)
  const nakami = readFileSync(filepath, 'utf-8')
  await putObject(bucket, filename, nakami, type)
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
