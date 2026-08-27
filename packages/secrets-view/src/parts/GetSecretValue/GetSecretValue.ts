import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { Secret } from '../Secret/Secret.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const getSecretValue = async (secret: Secret): Promise<string> => {
  if (secret.value !== undefined) {
    return secret.value
  }
  if (PlatformState.get() !== PlatformType.Electron) {
    return ''
  }
  return (await MainProcess.invoke('SecretStorage.get', secret.extensionId, secret.key)) ?? ''
}
