import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as CancelEdit from '../CancelEdit/CancelEdit.ts'
import * as Edit from '../Edit/Edit.ts'
import * as Save from '../Save/Save.ts'

export const handleClick = (state: SecretsViewState, action: string): SecretsViewState | Promise<SecretsViewState> => {
  const [kind, rawIndex] = action.split(':')
  const index = Number(rawIndex)
  switch (kind) {
    case 'cancel':
      return CancelEdit.cancelEdit(state)
    case 'edit':
      return Edit.edit(state, index)
    case 'save':
      return Save.save(state)
    default:
      return state
  }
}
