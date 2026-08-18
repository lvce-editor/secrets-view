import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const handleInput = (state: SecretsViewState, value: string): SecretsViewState => ({
  ...state,
  editingValue: value,
})
