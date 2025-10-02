import 'dotenv/config'

import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { z } from 'astro/zod'

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

export async function s3() {
  await createBucket('kiroku')
}
