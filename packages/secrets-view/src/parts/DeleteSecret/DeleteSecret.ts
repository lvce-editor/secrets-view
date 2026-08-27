import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const deleteSecret = (state: SecretsViewState, index: number): SecretsViewState => {
  const { deletedIndices, editMode, revealedIndices, secrets } = state
  if (!editMode || !secrets[index] || deletedIndices.includes(index)) {
    return state
  }
  return {
    ...state,
    deletedIndices: [...deletedIndices, index],
    errorMessage: '',
    revealedIndices: revealedIndices.filter((candidate) => candidate !== index),
  }
}
