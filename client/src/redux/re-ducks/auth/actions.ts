import { SetAuthStatus } from '../types'

export enum AuthActionTypes {
  SET_AUTH_STATUS = 'auth/SET_AUTH_STATUS',
}

export const setAuthStatus = (payload: boolean): SetAuthStatus => {
  return {
    type: AuthActionTypes.SET_AUTH_STATUS,
    payload,
  }
}
