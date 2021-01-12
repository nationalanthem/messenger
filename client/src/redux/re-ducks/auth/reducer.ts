import { AuthActions, AuthState } from '../types'
import { AuthActionTypes } from './actions'

const authReducer = (
  initialState: AuthState = !!localStorage.getItem('token'),
  action: AuthActions
) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_STATUS:
      return action.payload
    default:
      return initialState
  }
}

export default authReducer
