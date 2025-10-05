import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { watasu } from './loader/morau'

const isdev = import.meta.env.DEV

const kizischema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  date: z.string(),
  daowari: z.string(),
  update: z.string(),
  upowari: z.string(),
  tags: z.array(reference('tags')),
})

const tagschema = z.object({
  name: z.string(),
  description: z.string(),
  romazi: z.string(),
})

const kizisdev = defineCollection({
  loader: glob({ pattern: '**/[!_]*.mdx', base: './src/content/kiroku' }),
  schema: kizischema,
})

const tagsdev = defineCollection({
  loader: glob({ pattern: '**/[!_]*.json', base: './src/content/tags' }),
  schema: tagschema,
})

let kizis = defineCollection({
  loader: watasu({ list: 'kizis.json', ctype: 'markdown' }),
  schema: kizischema,
})

let tags = defineCollection({
  loader: watasu({ list: 'tags.json', ctype: 'json' }),
  schema: tagschema,
})

if (isdev) {
  kizis = kizisdev
  tags = tagsdev
}

export const collections = { kizis, tags }
