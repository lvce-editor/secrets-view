import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as SecretsAriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getSecretRowVirtualDom } from '../GetSecretRowVirtualDom/GetSecretRowVirtualDom.ts'
import * as SecretsViewStrings from '../SecretsViewStrings/SecretsViewStrings.ts'

const text = (value: string): VirtualDomNode => ({ childCount: 0, text: value, type: VirtualDomElements.Text })

const emptyNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SecretsViewEmpty,
  role: AriaRoles.Status,
  type: VirtualDomElements.Div,
}

const headerNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.SecretsViewHeader,
  type: VirtualDomElements.Div,
}

const headerContentNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.SecretsViewHeaderContent,
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

const errorNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SecretsViewError,
  role: AriaRoles.Alert,
  type: VirtualDomElements.Div,
}

const textButton = (name: string, label: string, ariaLabel: string, primary = false): readonly VirtualDomNode[] => [
  {
    ariaLabel,
    childCount: 1,
    className: mergeClassNames(ClassNames.Button, primary ? ClassNames.ButtonPrimary : '', ClassNames.SecretsViewButton),
    name,
    onClick: DomEventListenerFunctions.HandleClick,
    type: VirtualDomElements.Button,
  },
  text(label),
]

const getEmptyDom = (loaded: boolean): readonly VirtualDomNode[] => [
  emptyNode,
  text(loaded ? SecretsViewStrings.noSecretsStored() : SecretsViewStrings.loadingSecrets()),
]

interface IndexedSecret {
  readonly index: number
  readonly secret: SecretsViewState['secrets'][number]
}

export const getSecretsViewVirtualDom = (state: SecretsViewState): readonly VirtualDomNode[] => {
  const { deletedIndices, editingValues, editMode, errorMessage, loaded, revealedIndices, secrets, secretValues } = state
  const visibleSecrets = secrets
    .map((secret, index): IndexedSecret => ({ index, secret }))
    .filter((item: IndexedSecret) => !deletedIndices.includes(item.index))
  const content =
    visibleSecrets.length === 0
      ? getEmptyDom(loaded)
      : visibleSecrets.flatMap((item: IndexedSecret) =>
          getSecretRowVirtualDom(item.secret, item.index, editMode, editingValues, revealedIndices, secretValues),
        )
  const errorDom: readonly VirtualDomNode[] = errorMessage ? [errorNode, text(errorMessage)] : []
  let headerActions: readonly VirtualDomNode[] = []
  if (editMode) {
    headerActions = [
      ...textButton('save', SecretsViewStrings.save(), SecretsViewStrings.saveSecrets(), true),
      ...textButton('cancel', SecretsViewStrings.cancel(), SecretsViewStrings.cancelEditingSecrets()),
    ]
  } else if (secrets.length > 0) {
    headerActions = textButton('edit', SecretsViewStrings.edit(), SecretsViewStrings.editSecrets(), true)
  }
  return [
    {
      childCount: errorMessage ? 3 : 2,
      className: mergeClassNames(ClassNames.Viewlet, ClassNames.SecretsView),
      type: VirtualDomElements.Div,
    },
    headerNode,
    headerContentNode,
    titleNode,
    text(SecretsViewStrings.secrets()),
    descriptionNode,
    text(SecretsViewStrings.description()),
    {
      ariaLabel: SecretsViewStrings.secretsActions(),
      childCount: headerActions.length / 2,
      className: ClassNames.SecretsViewHeaderActions,
      role: SecretsAriaRoles.ToolBar,
      type: VirtualDomElements.Div,
    },
    ...headerActions,
    ...errorDom,
    {
      ariaLabel: SecretsViewStrings.storedSecrets(),
      childCount: visibleSecrets.length || 1,
      className: ClassNames.SecretsViewList,
      role: SecretsAriaRoles.List,
      type: VirtualDomElements.Ul,
    },
    ...content,
  ]
}
