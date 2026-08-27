import type { Secret } from '../Secret/Secret.ts'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import { compareSecrets } from '../CompareSecrets/CompareSecrets.ts'

export const setData = (state: SecretsViewState, secrets: readonly Secret[]): SecretsViewState => ({
  ...state,
  deletedIndices: [],
  editingValues: [],
  editMode: false,
  errorMessage: '',
  loaded: true,
  originalValues: [],
  revealedIndices: [],
  secrets: secrets.toSorted(compareSecrets),
  secretValues: [],
})
