import { files } from './files'
import { s3 } from './s3'

const args = process.argv.slice(2)

if (args[0] === 's3') {
  await s3(args[1])
} else if (args[0] === 'files') {
  await files()
} else {
  console.error('none')
}
