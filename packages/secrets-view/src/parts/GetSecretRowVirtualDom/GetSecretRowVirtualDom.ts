import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Secret } from '../Secret/Secret.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as SecretsViewStrings from '../SecretsViewStrings/SecretsViewStrings.ts'

const maskedValue = '••••••••••••'

const rowNode: VirtualDomNode = {
  childCount: 4,
  className: ClassNames.SecretsViewRow,
  role: AriaRoles.ListItem,
  type: VirtualDomElements.Li,
}

const iconButton = (name: string, label: string, iconClassName: string): readonly VirtualDomNode[] => [
  {
    ariaLabel: label,
    childCount: 1,
    className: mergeClassNames(ClassNames.IconButton, ClassNames.SecretsViewButton),
    name,
    onClick: DomEventListenerFunctions.HandleClick,
    title: label,
    type: VirtualDomElements.Button,
  },
  {
    childCount: 0,
    className: mergeClassNames(ClassNames.MaskIcon, iconClassName),
    type: VirtualDomElements.Div,
  },
]

export const getSecretRowVirtualDom = (
  secret: Secret,
  index: number,
  editMode: boolean,
  editingValues: readonly string[],
  revealedIndices: readonly number[],
  secretValues: readonly string[],
): readonly VirtualDomNode[] => {
  const revealed = revealedIndices.includes(index)
  let value = maskedValue
  if (editMode) {
    value = editingValues[index]
  } else if (revealed) {
    value = secretValues[index]
  }
  const revealLabel = revealed
    ? SecretsViewStrings.hideSecret(secret.extensionId, secret.key)
    : SecretsViewStrings.showSecret(secret.extensionId, secret.key)
  const actions = [
    ...iconButton(`reveal:${index}`, revealLabel, revealed ? ClassNames.MaskIconEyeClosed : ClassNames.MaskIconEye),
    ...iconButton(`copy:${index}`, SecretsViewStrings.copySecret(secret.extensionId, secret.key), ClassNames.MaskIconCopy),
    ...(editMode ? iconButton(`delete:${index}`, SecretsViewStrings.deleteSecret(secret.extensionId, secret.key), ClassNames.MaskIconTrash) : []),
  ]
  return [
    rowNode,
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.SecretsViewExtensionId),
      inputType: 'text',
      readOnly: true,
      tabIndex: -1,
      title: secret.extensionId,
      type: VirtualDomElements.Input,
      value: secret.extensionId,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.SecretsViewKey),
      inputType: 'text',
      readOnly: true,
      tabIndex: -1,
      title: secret.key,
      type: VirtualDomElements.Input,
      value: secret.key,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.SecretsViewValue),
      inputType: revealed ? 'text' : 'password',
      name: `value:${index}`,
      readOnly: !editMode,
      tabIndex: editMode ? 0 : -1,
      type: VirtualDomElements.Input,
      value,
      ...(editMode && { onInput: DomEventListenerFunctions.HandleInput }),
    },
    {
      ariaLabel: SecretsViewStrings.actionsForSecret(secret.extensionId, secret.key),
      childCount: editMode ? 3 : 2,
      className: ClassNames.SecretsViewActions,
      role: AriaRoles.ToolBar,
      type: VirtualDomElements.Div,
    },
    ...actions,
  ]
}
