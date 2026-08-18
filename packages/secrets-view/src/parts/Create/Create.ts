import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as SecretsViewStates from '../SecretsViewStates/SecretsViewStates.ts'

export const create = (uid: number, _uri: string, x: number, y: number, width: number, height: number): void => {
  const state: SecretsViewState = {
    editingIndex: -1,
    editingValue: '',
    height,
    loaded: false,
    secrets: [],
    uid,
    width,
    x,
    y,
  }
  SecretsViewStates.set(uid, state, state)
}
