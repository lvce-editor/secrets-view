import type { Secret } from '../Secret/Secret.ts'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const loadContent = async (state: SecretsViewState): Promise<SecretsViewState> => {
  const secrets: readonly Secret[] = await RendererProcess.invoke('SecretStorage.list')
  return {
    ...state,
    loaded: true,
    secrets,
  }
}
