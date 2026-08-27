import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import { getSecretValue } from '../GetSecretValue/GetSecretValue.ts'
import * as SecretsViewStrings from '../SecretsViewStrings/SecretsViewStrings.ts'

export const toggleReveal = async (state: SecretsViewState, index: number): Promise<SecretsViewState> => {
  const { deletedIndices, editingValues, editMode, revealedIndices, secrets, secretValues: oldSecretValues } = state
  const secret = secrets[index]
  if (!secret || deletedIndices.includes(index)) {
    return state
  }
  if (revealedIndices.includes(index)) {
    const secretValues = [...oldSecretValues]
    if (!editMode) {
      secretValues[index] = ''
    }
    return {
      ...state,
      revealedIndices: revealedIndices.filter((candidate) => candidate !== index),
      secretValues,
    }
  }
  try {
    const value = editMode ? editingValues[index] : await getSecretValue(secret)
    const secretValues = [...oldSecretValues]
    secretValues[index] = value
    return {
      ...state,
      errorMessage: '',
      revealedIndices: [...revealedIndices, index],
      secretValues,
    }
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : String(error)
    return {
      ...state,
      errorMessage: SecretsViewStrings.failedToRevealSecret(secret.extensionId, secret.key, message),
    }
  }
}
