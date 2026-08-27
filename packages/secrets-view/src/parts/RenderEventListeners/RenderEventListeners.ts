import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly any[] => [
  {
    name: DomEventListenerFunctions.HandleClick,
    params: ['handleClick', EventExpression.TargetName],
  },
  {
    name: DomEventListenerFunctions.HandleInput,
    params: ['handleInput', EventExpression.TargetName, EventExpression.TargetValue],
  },
]
