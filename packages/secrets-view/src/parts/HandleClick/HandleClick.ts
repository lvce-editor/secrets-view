import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as CancelEdit from '../CancelEdit/CancelEdit.ts'
import * as CopySecret from '../CopySecret/CopySecret.ts'
import * as DeleteSecret from '../DeleteSecret/DeleteSecret.ts'
import * as Edit from '../Edit/Edit.ts'
import * as Save from '../Save/Save.ts'
import * as ToggleReveal from '../ToggleReveal/ToggleReveal.ts'

export const handleClick = (state: SecretsViewState, action: string): SecretsViewState | Promise<SecretsViewState> => {
  const [kind, rawIndex] = action.split(':')
  const index = Number(rawIndex)
  switch (kind) {
    case 'cancel':
      return CancelEdit.cancelEdit(state)
    case 'copy':
      return CopySecret.copySecret(state, index)
    case 'delete':
      return DeleteSecret.deleteSecret(state, index)
    case 'edit':
      return Edit.edit(state)
    case 'reveal':
      return ToggleReveal.toggleReveal(state, index)
    case 'save':
      return Save.save(state)
    default:
      return state
  }
}
