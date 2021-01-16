import { combineReducers } from 'redux'

import noticeReducer from './re-ducks/notice/reducer'
import authReducer from './re-ducks/auth/reducer'
import userReducer from './re-ducks/user/reducer'
import messagesReducer from './re-ducks/messages/reducer'
import dialogReducer from './re-ducks/dialog/reducer'

export const rootReducer = combineReducers({
  notice: noticeReducer,
  auth: authReducer,
  user: userReducer,
  messages: messagesReducer,
  dialog: dialogReducer,
})

export type RootState = ReturnType<typeof rootReducer>
