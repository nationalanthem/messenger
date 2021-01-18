import { User } from '../../../api/types'
import { SetUser } from '../types'

export enum UserActionTypes {
  SET_USER = 'user/SET_USER',
}

export const setUser = (payload: User): SetUser => {
  return {
    type: UserActionTypes.SET_USER,
    payload,
  }
}
