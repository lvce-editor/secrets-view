import { MainProcess } from '@lvce-editor/rpc-registry'
import type { Secret } from '../Secret/Secret.ts'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const loadContent = async (state: SecretsViewState): Promise<SecretsViewState> => {
  const secrets: readonly Secret[] = await MainProcess.invoke('SecretStorage.list')
  return {
    ...state,
    loaded: true,
    secrets,
  }
}
