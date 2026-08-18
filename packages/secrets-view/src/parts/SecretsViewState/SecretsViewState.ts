import type { Secret } from '../Secret/Secret.ts'

export interface SecretsViewState {
  readonly editingIndex: number
  readonly editingValue: string
  readonly height: number
  readonly loaded: boolean
  readonly secrets: readonly Secret[]
  readonly uid: number
  readonly width: number
  readonly x: number
  readonly y: number
}
