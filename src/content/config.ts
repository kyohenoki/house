import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { watasu } from './loader/morau'

const isdev = import.meta.env.DEV

const kizisdev = defineCollection({
  loader: glob({ pattern: '**/[!_]*.mdx', base: './src/content/kiroku' }),
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
})

const tagsdev = defineCollection({
  loader: glob({ pattern: '**/[!_]*.json', base: './src/content/tags' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    romazi: z.string(),
  }),
})

let kizis = defineCollection({
  loader: watasu({ list: 'kizis.json', ctype: 'markdown' }),
})

let tags = defineCollection({
  loader: watasu({ list: 'tags.json', ctype: 'json' }),
})

if (isdev) {
  kizis = kizisdev
  tags = tagsdev
}

export const collections = { kizis, tags }
