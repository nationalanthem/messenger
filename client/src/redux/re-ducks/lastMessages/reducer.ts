import produce, { Draft } from 'immer'
import { LastMessagesActions, LastMessagesState, LoadingState } from '../types'
import { LastMessagesActionTypes } from './actions'

const initialState: LastMessagesState = {
  messages: [],
  status: LoadingState.IDLE,
}

const lastMessagesReducer = produce(
  (draft: Draft<LastMessagesState>, action: LastMessagesActions) => {
    switch (action.type) {
      case LastMessagesActionTypes.FETCH_LAST_MESSAGES_START:
        draft.status = LoadingState.LOADING
        break
      case LastMessagesActionTypes.FETCH_LAST_MESSAGES_SUCCESS:
        draft.status = LoadingState.LOADED
        draft.messages = action.payload
        break
      case LastMessagesActionTypes.SET_LAST_USER_MESSAGE:
        let idx = draft.messages.findIndex((u) => u.user_id === action.payload.user_id)
        if (idx !== -1) draft.messages[idx].lastMessage = action.payload.lastMessage
        break
      case LastMessagesActionTypes.ADD_NEW_MESSAGE:
        draft.messages.push(action.payload)
        break
    }
  },
  initialState
)

export default lastMessagesReducer
