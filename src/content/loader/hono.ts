import { env } from 'cloudflare:workers'
import { Hono } from 'hono'
import { getk } from './dasu'

const app = new Hono()

app.get('/', (c) => {
  return c.text('S3（R2互換、Localstack）とのファイルの通信\nURLにファイル名を書いてアクセスする')
})

app.get('/:name', async (c) => {
  const id = c.req.param('name')
  const res = await getk(id, env)
  if (res.status === 404) {
    return c.text('その名前のファイルは存在しないみたい', 404)
  } else if (!res.ok) {
    return c.text('何かがおかしいね', 500)
  } else {
    return res
  }
})

export default app
