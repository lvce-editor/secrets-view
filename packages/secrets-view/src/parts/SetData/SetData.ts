import { compareSecrets } from '../CompareSecrets/CompareSecrets.ts'
import type { Secret } from '../Secret/Secret.ts'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const setData = (state: SecretsViewState, secrets: readonly Secret[]): SecretsViewState => ({
  ...state,
  editingIndex: -1,
  editingValue: '',
  loaded: true,
  secrets: secrets.toSorted(compareSecrets),
})
