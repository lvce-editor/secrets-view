import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as PlatformState from '../src/parts/PlatformState/PlatformState.ts'

const state: SecretsViewState = {
  deletedIndices: [],
  editingValues: [],
  editMode: false,
  errorMessage: '',
  height: 600,
  loaded: false,
  originalValues: [],
  revealedIndices: [],
  secrets: [],
  secretValues: [],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

test('returns an empty view outside Electron', async () => {
  PlatformState.set(PlatformType.Web)

  await expect(loadContent(state)).resolves.toMatchObject({ loaded: true, secrets: [] })
})
