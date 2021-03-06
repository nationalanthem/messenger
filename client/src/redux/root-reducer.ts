import { combineReducers } from 'redux'

import noticeReducer from './re-ducks/notice/reducer'
import authReducer from './re-ducks/auth/reducer'
import userReducer from './re-ducks/user/reducer'
import lastMessagesReducer from './re-ducks/lastMessages/reducer'
import dialogReducer from './re-ducks/dialog/reducer'
import filterReducer from './re-ducks/filter/reducer'

export const rootReducer = combineReducers({
  notice: noticeReducer,
  auth: authReducer,
  user: userReducer,
  lastMessages: lastMessagesReducer,
  dialog: dialogReducer,
  filter: filterReducer,
})

export type RootState = ReturnType<typeof rootReducer>
