import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const cancelEdit = (state: SecretsViewState): SecretsViewState => ({
  ...state,
  editingIndex: -1,
  editingValue: '',
  errorMessage: '',
})
