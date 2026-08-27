import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const cancelEdit = (state: SecretsViewState): SecretsViewState => ({
  ...state,
  deletedIndices: [],
  editingValues: [],
  editMode: false,
  errorMessage: '',
  originalValues: [],
  revealedIndices: [],
  secretValues: [],
})
