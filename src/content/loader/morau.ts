import 'dotenv/config'

import { reference, z } from 'astro:content'
import type { Loader, LoaderContext } from 'astro/loaders'
import matter from 'gray-matter'
import remarkStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { getk } from './dasu'

const envs = process.env

// 25/10/05 13:49 一度変換とかが比較的簡単な JSON のほうから先にやるか、このままじゃ終わらない
// 15:03 tags に限りいけた！！次は kizis に挑む

export const watasu = (options: { list: 'kizis.json' | 'tags.json'; ctype: 'markdown' | 'json' }): Loader => {
  if (options.ctype === 'json') {
    return {
      name: 'watasu',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        romazi: z.string(),
      }),
      load: async (context: LoaderContext) => {
        context.logger.info('loading')
        context.store.clear()
        const listres = await getk(options.list, envs)
        if (!listres.ok) {
          throw new Error(`${listres.status}`)
        }
        const listjson: John = await listres.json()
        await Promise.all(
          listjson.paths.map(async (m) => {
            const komokures = await getk(m.key, envs)
            if (!komokures.ok) {
              if (komokures.status === 404) {
                context.logger.warn(`${komokures.status} and skip`)
                return
              }
              throw new Error(`${komokures.status}`)
            }
            const komoku: Komoku = await komokures.json()
            const parsed = await context.parseData({ id: komoku.romazi, data: komoku })
            context.store.set({
              id: komoku.romazi,
              data: parsed,
            })
          })
        )
        context.logger.info('tags complete')
      },
    }
  } else {
    return {
      name: 'watasu',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string(),
        date: z.string(),
        daowari: z.string(),
        update: z.string(),
        upowari: z.string(),
        tags: z.array(reference('tags')),
      }),
      load: async (context: LoaderContext) => {
        context.logger.info('loading')
        context.store.clear()
        const listres = await getk(options.list, envs)
        if (!listres.ok) {
          throw new Error(`${listres.status}`)
        }
        const listjson: John = await listres.json()
        await Promise.all(
          listjson.paths.map(async (m) => {
            const kizires = await getk(m.key, envs)
            if (!kizires.ok) {
              if (kizires.status === 404) {
                context.logger.warn(`${kizires.status} and skip`)
                return
              }
              throw new Error(`${kizires.status}`)
            }
            const kizi = await kizires.text()
            const { frontmatter, content } = await henkan(kizi)
            const parsed = await context.parseData({ id: frontmatter.slug, data: frontmatter })
            context.store.set({
              id: parsed.slug,
              data: parsed,
              rendered: {
                html: content,
              },
            })
          })
        )
        context.logger.info('kizis complete')
      },
    }
  }
}

type John = {
  paths: {
    key: string
    name: string
  }[]
}

type Komoku = {
  name: string
  description: string
  romazi: string
}

// ただの文字列なので frontmatter を抽出、Markdown に変換する

async function henkan(ctx: string) {
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

// Loader 何が駄目なんだろうか
// 25/10/05 15:30 記念のため、残しておく

// export const morau = (options: { list: string; ctype: 'markdown' | 'json' }): Loader => {
//   return {
//     name: 'morau',
//     load: async ({ store, parseData, generateDigest, logger }) => {
//       logger.info('loading')
//       store.clear()
//       const listres = await getk(options.list, envdaze())
//       if (!listres.ok) {
//         throw new Error(`${listres.status}`)
//       }
//       const listjohn: John = await listres.json()
//       await Promise.all(
//         listjohn.paths.map(async (m) => {
//           const kizires = await getk(m.key, envdaze())
//           if (!kizires.ok) {
//             if (kizires.status === 404) {
//               logger.warn('not found')
//               return
//             }
//             throw new Error(`${kizires.status}`)
//           }
//           const kizic = await kaesu(kizires, options.ctype)
//           if (options.ctype === 'markdown') {
//             const { frontmatter, content } = await henkan(kizic)
//             const result = frontmatter
//             const safef = result.data
//             const parsed = await parseData({ id: safef.slug, data: safef })
//             const digest = generateDigest(parsed)
//             const rendered = {
//               html: content,
//             }
//             store.set({
//               id: safef.slug,
//               data: parsed.data,
//               rendered,
//               digest,
//             })
//           }
//         })
//       )
//     },
//   }
// }
