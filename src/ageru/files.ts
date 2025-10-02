import { globby } from 'globby'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = path.dirname(fileURLToPath(import.meta.url))

export async function files() {
  console.log(await sagasu('.', '../content/kiroku', 'mdx'))
  console.log(await sagasu('.', '../content/tags', 'json'))
}

async function sagasu(sapath: string, dir: string, ext: string) {
  const base = path.resolve(directory, sapath)
  const files = await globby([`${dir}/**/*.${ext}`, `!${dir}/**/_*.${ext}`], {
    cwd: directory,
    absolute: true,
  })
  return files.map((file) => path.relative(base, file))
}
