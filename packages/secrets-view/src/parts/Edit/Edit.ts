import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import { getSecretValue } from '../GetSecretValue/GetSecretValue.ts'
import * as SecretsViewStrings from '../SecretsViewStrings/SecretsViewStrings.ts'

export const edit = async (state: SecretsViewState): Promise<SecretsViewState> => {
  const { editMode, secrets } = state
  if (editMode || secrets.length === 0) {
    return state
  }
  try {
    const editingValues = await Promise.all(secrets.map(getSecretValue))
    return {
      ...state,
      deletedIndices: [],
      editingValues,
      editMode: true,
      errorMessage: '',
      originalValues: editingValues,
      revealedIndices: [],
      secretValues: editingValues,
    }
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : String(error)
    return {
      ...state,
      errorMessage: SecretsViewStrings.failedToEditSecrets(message),
    }
  }
}
