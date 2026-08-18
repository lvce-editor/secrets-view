import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as SecretsAriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getSecretRowVirtualDom } from '../GetSecretRowVirtualDom/GetSecretRowVirtualDom.ts'

const text = (value: string): VirtualDomNode => ({ childCount: 0, text: value, type: VirtualDomElements.Text })

const emptyNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SecretsViewEmpty,
  role: AriaRoles.Status,
  type: VirtualDomElements.Div,
}

const rootNode: VirtualDomNode = {
  childCount: 2,
  className: mergeClassNames(ClassNames.Viewlet, ClassNames.SecretsView),
  type: VirtualDomElements.Div,
}

const headerNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.SecretsViewHeader,
  type: VirtualDomElements.Div,
}

const titleNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SecretsViewTitle,
  type: VirtualDomElements.H1,
}

const descriptionNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SecretsViewDescription,
  type: VirtualDomElements.P,
}

const titleText = text('Secrets')
const descriptionText = text('Stored extension secrets are encrypted. Values stay hidden until you choose Edit.')

const getEmptyDom = (loaded: boolean): readonly VirtualDomNode[] => [emptyNode, text(loaded ? 'No secrets stored.' : 'Loading secrets…')]

export const getSecretsViewVirtualDom = (state: SecretsViewState): readonly VirtualDomNode[] => {
  const { editingIndex, editingValue, loaded, secrets } = state
  const content =
    secrets.length === 0 ? getEmptyDom(loaded) : secrets.flatMap((secret, index) => getSecretRowVirtualDom(secret, index, editingIndex, editingValue))
  return [
    rootNode,
    headerNode,
    titleNode,
    titleText,
    descriptionNode,
    descriptionText,
    {
      ariaLabel: 'Stored secrets',
      childCount: secrets.length || 1,
      className: ClassNames.SecretsViewList,
      role: SecretsAriaRoles.List,
      type: VirtualDomElements.Ul,
    },
    ...content,
  ]
}
