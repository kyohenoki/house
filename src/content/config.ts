import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { watasu } from './loader/morau'

const kizis = defineCollection({
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

const tags = defineCollection({
  loader: watasu({
    list: 'tags.json',
    ctype: 'json',
  }),
})

export const collections = { kizis, tags }
