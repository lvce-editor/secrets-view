import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Secret } from '../Secret/Secret.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const maskedValue = '••••••••••••'

const text = (value: string): VirtualDomNode => ({ childCount: 0, text: value, type: VirtualDomElements.Text })

const rowNode: VirtualDomNode = {
  childCount: 4,
  className: ClassNames.SecretsViewRow,
  role: AriaRoles.ListItem,
  type: VirtualDomElements.Li,
}

const button = (name: string, label: string): readonly VirtualDomNode[] => [
  {
    ariaLabel: label,
    childCount: 1,
    className: mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary, ClassNames.SecretsViewButton),
    name,
    onClick: DomEventListenerFunctions.HandleClick,
    type: VirtualDomElements.Button,
  },
  text(label),
]

export const getSecretRowVirtualDom = (secret: Secret, index: number, editingIndex: number, editingValue: string): readonly VirtualDomNode[] => {
  const editing = editingIndex === index
  const actionDom = editing ? [...button(`save:${index}`, 'Save'), ...button(`cancel:${index}`, 'Cancel')] : button(`edit:${index}`, 'Edit')
  const actionCount = editing ? 2 : 1
  return [
    rowNode,
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.SecretsViewExtensionId),
      inputType: 'text',
      readOnly: true,
      title: secret.extensionId,
      type: VirtualDomElements.Input,
      value: secret.extensionId,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.SecretsViewKey),
      inputType: 'text',
      readOnly: true,
      title: secret.key,
      type: VirtualDomElements.Input,
      value: secret.key,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.SecretsViewValue),
      inputType: 'password',
      name: 'secret-value',
      readOnly: !editing,
      type: VirtualDomElements.Input,
      value: editing ? editingValue : maskedValue,
      ...(editing && { onInput: DomEventListenerFunctions.HandleInput }),
    },
    {
      childCount: actionCount,
      className: ClassNames.SecretsViewActions,
      type: VirtualDomElements.Div,
    },
    ...actionDom,
  ]
}
