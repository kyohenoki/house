// const kizis = defineCollection({
//   loader: morau({
//     list: 'kizis.json',
//   }),
// })

import { reference, z } from 'astro:content'
import type { Loader } from 'astro/loaders'

export const morau = (options: { list: string }): Loader => {
  const schema = z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    date: z.string(),
    daowari: z.string(),
    update: z.string(),
    upowari: z.string(),
    tags: z.array(reference('tags')),
  })
  const load = async () => {}
  return {
    name: 'morau',
    schema,
    load,
  }
}
