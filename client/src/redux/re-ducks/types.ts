import { MessageActionTypes } from './message/actions'
import { AuthActionTypes } from './auth/actions'

// message

export interface SetMessage {
  type: MessageActionTypes.SET_MESSAGE
  payload: Message
}

export interface ClearMessage {
  type: MessageActionTypes.CLEAR_MESSAGE
}

export type MessageActions = SetMessage | ClearMessage

export interface Message {
  text: string
  kind: 'success' | 'error' | 'info'
}

export type MessageState = Message | null

// auth

export interface SetAuthStatus {
  type: AuthActionTypes.SET_AUTH_STATUS
  payload: boolean
}

export type AuthActions = SetAuthStatus

export type AuthState = boolean
