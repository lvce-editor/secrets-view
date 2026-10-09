import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')
const sharedProcess = await import(pathToFileURL(sharedProcessPath).toString())

process.env.PATH_PREFIX = '/secrets-view'
const { commitHash } = await sharedProcess.exportStatic({ extensionPath: '', root, testPath: 'packages/e2e' })
const testPagesPath = join(root, 'dist', 'tests')
const testPages = (await readdir(testPagesPath)).filter((name) => name.endsWith('.html'))
const htmlPaths = [join(root, 'dist', 'index.html'), ...testPages.map((name) => join(testPagesPath, name))]
const configPattern = /(<script\b[^>]*\bid=["']Config["'][^>]*>)([\s\S]*?)(<\/script>)/i
for (const htmlPath of htmlPaths) {
  const content = await readFile(htmlPath, 'utf8')
  const match = content.match(configPattern)
  if (!match) {
    if (htmlPath === join(testPagesPath, 'index.html')) {
      continue
    }
    throw new Error(`LVCE runtime configuration not found in ${htmlPath}`)
  }
  const config = JSON.parse(match[2])
  config.workerUrls['develop.secretsViewPath'] = `/secrets-view/${commitHash}/packages/secrets-view/dist/secretsViewWorkerMain.js`
  config.workerUrls['develop.testWorkerPath'] = `/secrets-view/${commitHash}/packages/test-worker/dist/testWorkerMain.js`
  await writeFile(
    htmlPath,
    content.replace(configPattern, (_match, opening, _config, closing) => `${opening}\n${JSON.stringify(config, null, 2)}\n${closing}`),
  )
}
const workerPath = join(root, '.tmp', 'dist', 'dist', 'secretsViewWorkerMain.js')
const testWorkerPath = join(root, 'dist', commitHash, 'packages', 'test-worker', 'dist', 'testWorkerMain.js')
await cp(new URL(import.meta.resolve('@lvce-editor/test-worker')), testWorkerPath)

const staticWorkerPath = join(root, 'dist', commitHash, 'packages', 'secrets-view', 'dist', 'secretsViewWorkerMain.js')
await mkdir(dirname(staticWorkerPath), { recursive: true })
await cp(workerPath, staticWorkerPath)
await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
