import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const handleInput = (state: SecretsViewState, name: string, value: string): SecretsViewState => {
  const { editingValues, editMode, secrets, secretValues } = state
  const [, rawIndex] = name.split(':')
  const index = Number(rawIndex)
  if (!editMode || !Number.isSafeInteger(index) || !secrets[index]) {
    return state
  }
  return {
    ...state,
    editingValues: editingValues.with(index, value),
    secretValues: secretValues.with(index, value),
  }
}
