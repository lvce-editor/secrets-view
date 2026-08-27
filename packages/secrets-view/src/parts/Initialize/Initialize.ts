import { initializeMainProcess } from '../InitializeMainProcess/InitializeMainProcess.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const initialize = async (platform: number): Promise<void> => {
  PlatformState.set(platform)
  await initializeMainProcess(platform)
}
