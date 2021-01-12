import { combineReducers } from 'redux'
import messageReducer from './re-ducks/message/reducer'
import authReducer from './re-ducks/auth/reducer'

export const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
