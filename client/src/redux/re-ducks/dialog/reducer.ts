import { DialogActions, DialogState } from '../types'
import { DialogActionTypes } from './actions'

const messagesReducer = (initialState: DialogState = null, action: DialogActions) => {
  switch (action.type) {
    case DialogActionTypes.SET_DIALOG_USER_ID:
      return action.payload
    default:
      return initialState
  }
}

export default messagesReducer
