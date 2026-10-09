import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')
const sharedProcess = await import(pathToFileURL(sharedProcessPath).toString())

process.env.PATH_PREFIX = '/secrets-view'
const { commitHash } = await sharedProcess.exportStatic({ extensionPath: '', root, testPath: 'packages/e2e' })
const indexPath = join(root, 'dist', 'index.html')
const content = await readFile(indexPath, 'utf8')
const configPattern = /(<script\b[^>]*\bid=["']Config["'][^>]*>)([\s\S]*?)(<\/script>)/i
const match = content.match(configPattern)
if (!match) {
  throw new Error('LVCE runtime configuration not found')
}
const config = JSON.parse(match[2])
config.workerUrls['develop.secretsViewPath'] = `/secrets-view/${commitHash}/packages/secrets-view/dist/secretsViewWorkerMain.js`
config.workerUrls['develop.testWorkerPath'] = `/secrets-view/${commitHash}/packages/test-worker/dist/testWorkerMain.js`
await writeFile(
  indexPath,
  content.replace(configPattern, (_match, opening, _config, closing) => `${opening}\n${JSON.stringify(config, null, 2)}\n${closing}`),
)
const workerPath = join(root, '.tmp', 'dist', 'dist', 'secretsViewWorkerMain.js')
const testWorkerPath = join(root, 'dist', commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js')
await cp(new URL(import.meta.resolve('@lvce-editor/test-worker')), testWorkerPath)

const staticWorkerPath = join(root, 'dist', commitHash, 'packages', 'secrets-view', 'dist', 'secretsViewWorkerMain.js')
await mkdir(dirname(staticWorkerPath), { recursive: true })
await cp(workerPath, staticWorkerPath)
await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
