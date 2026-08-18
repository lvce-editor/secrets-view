import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Edit from '../Edit/Edit.ts'
import * as HandleClick from '../HandleClick/HandleClick.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as Save from '../Save/Save.ts'
import * as SecretsViewStates from '../SecretsViewStates/SecretsViewStates.ts'
import * as SetData from '../SetData/SetData.ts'

const handleDirectMessagePort = (port: MessagePort, setAsRendererProcess?: boolean): Promise<void> =>
  handleMessagePort(port, commandMap, setAsRendererProcess)

export const commandMap = {
  'SecretsView.create': Create.create,
  'SecretsView.diff2': Diff2.diff2,
  'SecretsView.dispose': SecretsViewStates.dispose,
  'SecretsView.edit': SecretsViewStates.wrapCommand(Edit.edit),
  'SecretsView.getCommandIds': SecretsViewStates.getCommandIds,
  'SecretsView.handleClick': SecretsViewStates.wrapCommand(HandleClick.handleClick),
  'SecretsView.handleInput': SecretsViewStates.wrapCommand(HandleInput.handleInput),
  'SecretsView.handleMessagePort': handleDirectMessagePort,
  'SecretsView.loadContent': SecretsViewStates.wrapCommand(LoadContent.loadContent),
  'SecretsView.render2': Render2.render2,
  'SecretsView.renderEventListeners': RenderEventListeners.renderEventListeners,
  'SecretsView.resize': SecretsViewStates.wrapCommand(Resize.resize),
  'SecretsView.save': SecretsViewStates.wrapCommand(Save.save),
  'SecretsView.setData': SecretsViewStates.wrapCommand(SetData.setData),
}
