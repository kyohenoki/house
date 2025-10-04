import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'

import { morau } from './loader/morau'

const kizis = defineCollection({
  loader: morau({
    list: 'kizis.json',
    ctype: 'markdown',
  }),
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

const tags = defineCollection({
  loader: glob({ pattern: '**/[!_]*.json', base: './src/content/tags' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    romazi: z.string(),
  }),
})

export const collections = { kizis, tags }
