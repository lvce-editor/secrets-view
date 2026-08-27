import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const actionsForSecret = (extensionId: string, key: string): string => {
  return I18nString.i18nString(UiStrings.ActionsForSecret, { PH1: extensionId, PH2: key })
}

export const cancel = (): string => {
  return I18nString.i18nString(UiStrings.Cancel)
}

export const cancelEditingSecrets = (): string => {
  return I18nString.i18nString(UiStrings.CancelEditingSecrets)
}

export const copySecret = (extensionId: string, key: string): string => {
  return I18nString.i18nString(UiStrings.CopySecret, { PH1: extensionId, PH2: key })
}

export const deleteSecret = (extensionId: string, key: string): string => {
  return I18nString.i18nString(UiStrings.DeleteSecret, { PH1: extensionId, PH2: key })
}

export const description = (): string => {
  return I18nString.i18nString(UiStrings.Description)
}

export const edit = (): string => {
  return I18nString.i18nString(UiStrings.Edit)
}

export const editSecrets = (): string => {
  return I18nString.i18nString(UiStrings.EditSecrets)
}

export const failedToCopySecret = (extensionId: string, key: string, message: string): string => {
  return I18nString.i18nString(UiStrings.FailedToCopySecret, { PH1: extensionId, PH2: key, PH3: message })
}

export const failedToEditSecrets = (message: string): string => {
  return I18nString.i18nString(UiStrings.FailedToEditSecrets, { PH1: message })
}

export const failedToRevealSecret = (extensionId: string, key: string, message: string): string => {
  return I18nString.i18nString(UiStrings.FailedToRevealSecret, { PH1: extensionId, PH2: key, PH3: message })
}

export const failedToSaveSecrets = (message: string): string => {
  return I18nString.i18nString(UiStrings.FailedToSaveSecrets, { PH1: message })
}

export const hideSecret = (extensionId: string, key: string): string => {
  return I18nString.i18nString(UiStrings.HideSecret, { PH1: extensionId, PH2: key })
}

export const loadingSecrets = (): string => {
  return I18nString.i18nString(UiStrings.LoadingSecrets)
}

export const noSecretsStored = (): string => {
  return I18nString.i18nString(UiStrings.NoSecretsStored)
}

export const save = (): string => {
  return I18nString.i18nString(UiStrings.Save)
}

export const saveSecrets = (): string => {
  return I18nString.i18nString(UiStrings.SaveSecrets)
}

export const secrets = (): string => {
  return I18nString.i18nString(UiStrings.Secrets)
}

export const secretsActions = (): string => {
  return I18nString.i18nString(UiStrings.SecretsActions)
}

export const showSecret = (extensionId: string, key: string): string => {
  return I18nString.i18nString(UiStrings.ShowSecret, { PH1: extensionId, PH2: key })
}

export const storedSecrets = (): string => {
  return I18nString.i18nString(UiStrings.StoredSecrets)
}
