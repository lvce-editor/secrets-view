import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeMainProcess } from '../InitializeMainProcess/InitializeMainProcess.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'
import { registerCommands } from '../SecretsViewStates/SecretsViewStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([initializeRendererWorker(), initializeMainProcess()])
}
