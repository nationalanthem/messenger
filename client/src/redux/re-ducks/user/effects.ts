import { Dispatch } from 'redux'
import { userAPI } from '../../../api/user.api'
import { UserActions } from '../types'
import { setUser } from './actions'

export const fetchUser = () => (dispatch: Dispatch<UserActions>) => {
  return userAPI.getMyUserdata().then((response) => {
    dispatch(setUser(response.data))
  })
}
