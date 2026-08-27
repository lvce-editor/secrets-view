import { PlatformType } from '@lvce-editor/constants'
import { LazyTransferMessagePortRpcParent, type Rpc } from '@lvce-editor/rpc'
import { MainProcess, RendererWorker } from '@lvce-editor/rpc-registry'

export interface MainProcessDependencies {
  readonly createRpc: typeof LazyTransferMessagePortRpcParent.create
  readonly invokeRendererAndTransfer: typeof RendererWorker.invokeAndTransfer
  readonly setMainProcess: typeof MainProcess.set
}

const defaultDependencies: MainProcessDependencies = {
  createRpc: LazyTransferMessagePortRpcParent.create,
  invokeRendererAndTransfer: RendererWorker.invokeAndTransfer,
  setMainProcess: MainProcess.set,
}

const send = async (port: MessagePort, dependencies: MainProcessDependencies): Promise<void> => {
  await dependencies.invokeRendererAndTransfer(
    'SendMessagePortToMainProcess.sendMessagePortToMainProcess',
    port,
    'HandleElectronMessagePort.handleElectronMessagePort',
    0,
  )
}

export const initializeMainProcess = async (platform: number, dependencies: MainProcessDependencies = defaultDependencies): Promise<void> => {
  if (platform !== PlatformType.Electron) {
    return
  }
  const rpc: Rpc = await dependencies.createRpc({
    commandMap: {},
    send(port) {
      return send(port, dependencies)
    },
  })
  dependencies.setMainProcess(rpc)
}
