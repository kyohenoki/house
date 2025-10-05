import { defineCollection } from 'astro:content'
import { watasu } from './loader/morau'

const kizis = defineCollection({
  loader: watasu({
    list: 'kizis.json',
    ctype: 'markdown',
  }),
})

const tags = defineCollection({
  loader: watasu({
    list: 'tags.json',
    ctype: 'json',
  }),
})

export const collections = { kizis, tags }
