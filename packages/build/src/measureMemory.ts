import { measureMemory } from '@lvce-editor/measure-memory'
import { join } from 'node:path'
import { root } from './root.ts'

const threshold = 435_000

const instantiations = 200_000

const instantiationsPath = join(root, 'packages', 'secrets-view')

const workerPath = join(root, '.tmp/dist/dist/secretsViewWorkerMain.js')

const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs')

await measureMemory({
  playwrightPath,
  workerPath,
  threshold,
  instantiations,
  instantiationsPath,
})
