import { combineReducers } from 'redux'
import noticeReducer from './re-ducks/notice/reducer'
import authReducer from './re-ducks/auth/reducer'
import userReducer from './re-ducks/user/reducer'
import messagesReducer from './re-ducks/messages/reducer'

export const rootReducer = combineReducers({
  notice: noticeReducer,
  auth: authReducer,
  user: userReducer,
  messages: messagesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
