import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as SecretsViewStates from '../SecretsViewStates/SecretsViewStates.ts'

export const create = (uid: number, _uri: string, x: number, y: number, width: number, height: number): void => {
  const state: SecretsViewState = {
    deletedIndices: [],
    editingValues: [],
    editMode: false,
    errorMessage: '',
    height,
    loaded: false,
    originalValues: [],
    revealedIndices: [],
    secrets: [],
    secretValues: [],
    uid,
    width,
    x,
    y,
  }
  SecretsViewStates.set(uid, state, state)
}
