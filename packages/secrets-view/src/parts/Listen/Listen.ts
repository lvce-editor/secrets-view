import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { registerCommands } from '../SecretsViewStates/SecretsViewStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await RendererWorker.initializeRendererWorkerForWorker(CommandMap.commandMap)
}
