import { compile } from '@mdx-js/mdx'
import type { Loader } from 'astro/loaders'
import matter from 'gray-matter'
import { getk } from './dasu'

export const morau = (options: { list: string; ctype: 'markdown' | 'json' }): Loader => {
  return {
    name: 'morau',
    load: async ({ store, parseData, generateDigest, logger }) => {
      logger.info('loading')
      store.clear()
      const listres = await getk(options.list)
      if (!listres.ok) {
        throw new Error(`${listres.status}`)
      }
      const listjohn: John = await listres.json()
      await Promise.all(
        listjohn.paths.map(async (m) => {
          const kizires = await getk(m.key)
          if (!kizires.ok) {
            if (kizires.status === 404) {
              logger.warn('not found')
              return
            }
            throw new Error(`${kizires.status}`)
          }
          const kizic = await kaesu(kizires, options.ctype)
          const { frontmatter, content } = await henkan(kizic)
          const parsed = await parseData({ id: frontmatter.slug, data: frontmatter })
          const digest = generateDigest(parsed)
          const rendered = {
            html: content,
          }
          store.set({
            id: frontmatter.slug,
            data: parsed.data,
            rendered,
            digest,
          })
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
  const { value } = await compile(mdx, {
    jsx: true,
  })
  const rendered = String(value)
  return {
    frontmatter,
    content: rendered,
  }
}
