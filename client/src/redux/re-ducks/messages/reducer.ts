import { MessagesActions, MessagesState } from '../types'
import { MessagesActionTypes } from './actions'

const messagesReducer = (initialState: MessagesState = null, action: MessagesActions) => {
  switch (action.type) {
    case MessagesActionTypes.SET_MESSAGES:
      return action.payload
    default:
      return initialState
  }
}

export default messagesReducer
