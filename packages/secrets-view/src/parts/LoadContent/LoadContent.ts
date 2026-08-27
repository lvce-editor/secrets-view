import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { Secret } from '../Secret/Secret.ts'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const loadContent = async (state: SecretsViewState): Promise<SecretsViewState> => {
  const secrets: readonly Secret[] = PlatformState.get() === PlatformType.Electron ? await MainProcess.invoke('SecretStorage.list') : []
  return {
    ...state,
    loaded: true,
    secrets,
  }
}
