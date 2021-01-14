import { combineReducers } from 'redux'
import messageReducer from './re-ducks/message/reducer'
import authReducer from './re-ducks/auth/reducer'
import userReducer from './re-ducks/user/reducer'

export const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
