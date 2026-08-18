import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

interface Dimensions {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

export const resize = (state: SecretsViewState, dimensions: Dimensions): SecretsViewState => ({ ...state, ...dimensions })
