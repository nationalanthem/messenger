import { UserActions, UserState } from '../types'
import { UserActionTypes } from './actions'

const userReducer = (initialState: UserState = null, action: UserActions) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return action.payload
    default:
      return initialState
  }
}

export default userReducer
