import { getk } from './dasu'
import { henkan, type John, kaesu } from './morau'

console.log(await main())

async function main() {
  const options = {
    list: 'kizis.json',
    ctype: 'markdown',
  }
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
          console.log(kizires.status)
          return
        }
        throw new Error(`${kizires.status}`)
      }
      const kizic = await kaesu(kizires, options.ctype)
      if (options.ctype === 'markdown') {
        const { frontmatter, content } = await henkan(kizic)
        console.log(frontmatter)
        console.log(content)
      }
    })
  )
}
