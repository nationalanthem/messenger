import { MessageActions, MessageState } from '../types'
import { MessageActionTypes } from './actions'

const messageReducer = (initialState: MessageState = null, action: MessageActions) => {
  switch (action.type) {
    case MessageActionTypes.SET_MESSAGE:
      return action.payload
    case MessageActionTypes.CLEAR_MESSAGE:
      return null
    default:
      return initialState
  }
}

export default messageReducer
