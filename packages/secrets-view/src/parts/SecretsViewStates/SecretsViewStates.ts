import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const { diff, dispose, get, getCommandIds, registerCommands, set, wrapCommand } = ViewletRegistry.create<SecretsViewState>()
