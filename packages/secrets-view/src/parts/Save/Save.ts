import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const save = async (state: SecretsViewState): Promise<SecretsViewState> => {
  const { editingIndex, editingValue, secrets } = state
  const secret = secrets[editingIndex]
  if (!secret) {
    return state
  }
  await RendererProcess.invoke('SecretStorage.store', secret.extensionId, secret.key, editingValue)
  return {
    ...state,
    editingIndex: -1,
    editingValue: '',
  }
}
