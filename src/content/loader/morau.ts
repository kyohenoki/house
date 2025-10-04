import 'dotenv/config'

import type { Loader } from 'astro/loaders'
import matter from 'gray-matter'
import remarkStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { z } from 'zod'
import { getk } from './dasu'

// DEV は dotenv PROD は cloudflare:workers に分けたいけど
// なんか上手く行かないので、とりあえず DEV 前提にしておく

function envdaze() {
  return process.env
}

const obj = z.record(
  z.string(),
  z.any().refine((v) => v !== undefined && v !== null)
)

// Loader 何が駄目なんだろうか

export const morau = (options: { list: string; ctype: 'markdown' | 'json' }): Loader => {
  return {
    name: 'morau',
    load: async ({ store, parseData, generateDigest, logger }) => {
      logger.info('loading')
      store.clear()
      const listres = await getk(options.list, envdaze())
      if (!listres.ok) {
        throw new Error(`${listres.status}`)
      }
      const listjohn: John = await listres.json()
      await Promise.all(
        listjohn.paths.map(async (m) => {
          const kizires = await getk(m.key, envdaze())
          if (!kizires.ok) {
            if (kizires.status === 404) {
              logger.warn('not found')
              return
            }
            throw new Error(`${kizires.status}`)
          }
          const kizic = await kaesu(kizires, options.ctype)
          if (options.ctype === 'markdown') {
            const { frontmatter, content } = await henkan(kizic)
            const result = obj.safeParse(frontmatter)
            if (!result.success) {
              throw new Error(String(result.error))
            } else {
              const safef = result.data
              const parsed = await parseData({ id: safef.slug, data: safef })
              const digest = generateDigest(parsed)
              const rendered = {
                html: content,
              }
              store.set({
                id: safef.slug,
                data: parsed.data,
                rendered,
                digest,
              })
            }
          }
        })
      )
    },
  }
}

export type John = {
  paths: {
    key: string
    name: string
  }[]
}

export async function kaesu(res: Response, ctype: string) {
  if (ctype === 'markdown') {
    return await res.text()
  } else {
    return await res.text()
  }
}

// ただの文字列なので frontmatter を抽出、Markdown に変換する

export async function henkan(ctx: string) {
  const { data: frontmatter, content: mdx } = matter(ctx)
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkRehype)
    .use(remarkStringify)
    .process(mdx)
  const html = String(file)
  return {
    frontmatter,
    content: html,
  }
}
