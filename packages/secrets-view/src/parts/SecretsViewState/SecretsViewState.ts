import type { Secret } from '../Secret/Secret.ts'

export interface SecretsViewState {
  readonly deletedIndices: readonly number[]
  readonly editingValues: readonly string[]
  readonly editMode: boolean
  readonly errorMessage: string
  readonly height: number
  readonly loaded: boolean
  readonly originalValues: readonly string[]
  readonly revealedIndices: readonly number[]
  readonly secrets: readonly Secret[]
  readonly secretValues: readonly string[]
  readonly uid: number
  readonly width: number
  readonly x: number
  readonly y: number
}
