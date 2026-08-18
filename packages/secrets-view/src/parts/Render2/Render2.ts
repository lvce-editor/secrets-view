import { ViewletCommand } from '@lvce-editor/constants'
import { getSecretsViewVirtualDom } from '../GetSecretsViewVirtualDom/GetSecretsViewVirtualDom.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as SecretsViewStates from '../SecretsViewStates/SecretsViewStates.ts'

export const render2 = async (uid: number, _diffResult: readonly number[]): Promise<readonly any[]> => {
  const { newState } = SecretsViewStates.get(uid)
  SecretsViewStates.set(uid, newState, newState)
  const commands = [[ViewletCommand.SetDom2, uid, getSecretsViewVirtualDom(newState)]]
  if (!RendererProcess.isConnected()) {
    return commands
  }
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, commands)
  return [['Viewlet.commitPending', uid, transactionId]]
}
