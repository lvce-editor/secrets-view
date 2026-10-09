import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const root = join(currentDir, '..', '..', '..')
const indexPath = join(root, 'node_modules', '@lvce-editor', 'static-server', 'static', 'index.html')
const content = await readFile(indexPath, 'utf8')
const configPattern = /(<script\b[^>]*\bid=["']Config["'][^>]*>)([\s\S]*?)(<\/script>)/i
const match = content.match(configPattern)
if (!match) {
  throw new Error('LVCE runtime configuration not found')
}
const config = JSON.parse(match[2])
/** @param {string} path */
const remoteUrl = (path) => `/remote${pathToFileURL(path).pathname}`
config.workerUrls['develop.secretsViewPath'] = remoteUrl(join(root, '.tmp', 'dist', 'dist', 'secretsViewWorkerMain.js'))
config.workerUrls['develop.testWorkerPath'] = remoteUrl(fileURLToPath(import.meta.resolve('@lvce-editor/test-worker')))
await writeFile(
  indexPath,
  content.replace(configPattern, (_match, opening, _config, closing) => `${opening}\n${JSON.stringify(config, null, 2)}\n${closing}`),
)
