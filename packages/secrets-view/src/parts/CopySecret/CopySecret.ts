import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import { getSecretValue } from '../GetSecretValue/GetSecretValue.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as SecretsViewStrings from '../SecretsViewStrings/SecretsViewStrings.ts'

export const copySecret = async (state: SecretsViewState, index: number): Promise<SecretsViewState> => {
  const { deletedIndices, editMode, revealedIndices, secrets, secretValues } = state
  const secret = secrets[index]
  if (!secret || deletedIndices.includes(index)) {
    return state
  }
  try {
    const value = editMode || revealedIndices.includes(index) ? secretValues[index] : await getSecretValue(secret)
    await RendererProcess.invoke('ClipBoard.writeText', value)
    return {
      ...state,
      errorMessage: '',
    }
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : String(error)
    return {
      ...state,
      errorMessage: SecretsViewStrings.failedToCopySecret(secret.extensionId, secret.key, message),
    }
  }
}
