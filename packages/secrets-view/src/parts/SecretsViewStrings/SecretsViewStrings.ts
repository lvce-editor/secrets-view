import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const cancel = (): string => {
  return I18nString.i18nString(UiStrings.Cancel)
}

export const description = (): string => {
  return I18nString.i18nString(UiStrings.Description)
}

export const edit = (): string => {
  return I18nString.i18nString(UiStrings.Edit)
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

export const secrets = (): string => {
  return I18nString.i18nString(UiStrings.Secrets)
}

export const storedSecrets = (): string => {
  return I18nString.i18nString(UiStrings.StoredSecrets)
}
