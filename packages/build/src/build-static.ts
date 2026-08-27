import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')
const sharedProcess = await import(pathToFileURL(sharedProcessPath).toString())

process.env.PATH_PREFIX = '/secrets-view'
const { commitHash } = await sharedProcess.exportStatic({ extensionPath: '', root, testPath: 'packages/e2e' })
const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')
const workerPath = join(root, '.tmp', 'dist', 'dist', 'secretsViewWorkerMain.js')
const remoteUrl = `/remote/${pathToFileURL(workerPath).toString().slice(8)}`
const content = await readFile(rendererWorkerPath, 'utf8')
const occurrence = `// const secretsViewWorkerUrl = \`\${assetDir}/packages/secrets-view/dist/secretsViewWorkerMain.js\`\nconst secretsViewWorkerUrl = \`${remoteUrl}\``
const replacement = 'const secretsViewWorkerUrl = `${assetDir}/packages/secrets-view/dist/secretsViewWorkerMain.js`'
if (content.includes(occurrence)) {
  await writeFile(rendererWorkerPath, content.replace(occurrence, replacement))
}

const staticWorkerPath = join(root, 'dist', commitHash, 'packages', 'secrets-view', 'dist', 'secretsViewWorkerMain.js')
await mkdir(dirname(staticWorkerPath), { recursive: true })
await cp(workerPath, staticWorkerPath)
await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
