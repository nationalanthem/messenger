import produce, { Draft } from 'immer'
import { LastMessagesActions, LastMessagesState } from '../types'
import { LastMessagesActionTypes } from './actions'

const initialState: LastMessagesState = []

const lastMessagesReducer = produce(
  (draft: Draft<LastMessagesState>, action: LastMessagesActions) => {
    switch (action.type) {
      case LastMessagesActionTypes.SET_LAST_MESSAGES:
        draft.push(...action.payload)
        break
      case LastMessagesActionTypes.SET_LAST_USER_MESSAGE:
        let idx = draft.findIndex((u) => u.user_id === action.payload.user_id)
        if (idx !== -1) draft[idx].lastMessage = action.payload.lastMessage
        break
      case LastMessagesActionTypes.ADD_NEW_MESSAGE:
        draft.push(action.payload)
        break
    }
  },
  initialState
)

export default lastMessagesReducer
