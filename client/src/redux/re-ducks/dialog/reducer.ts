import produce, { Draft } from 'immer'
import { DialogActions, DialogState, LoadingState } from '../types'
import { DialogActionTypes } from './actions'

const initialState: DialogState = {
  current_user_id: null,
  data: null,
  status: LoadingState.IDLE,
}

const dialogReducer = produce((draft: Draft<DialogState>, action: DialogActions) => {
  switch (action.type) {
    case DialogActionTypes.SET_DIALOG_USER_ID:
      draft.current_user_id = action.payload
      break
    case DialogActionTypes.ADD_DIALOG_MESSAGE:
      draft.data?.messages.push(action.payload)
      break
    case DialogActionTypes.FETCH_DIALOG_START:
      draft.status = LoadingState.LOADING
      draft.data = null
      break
    case DialogActionTypes.FETCH_DIALOG_SUCCESS:
      draft.status = LoadingState.LOADED
      draft.data = action.payload
      break
  }
}, initialState)

export default dialogReducer
