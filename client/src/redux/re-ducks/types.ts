import { NoticeActionTypes } from './notice/actions'
import { AuthActionTypes } from './auth/actions'
import { UserActionTypes } from './user/actions'
import { MessagesActionTypes } from './messages/actions'

// notice

export interface SetNotice {
  type: NoticeActionTypes
  payload: Notice
}

export interface ClearNotice {
  type: NoticeActionTypes.CLEAR_NOTICE
}

export type NoticeActions = SetNotice | ClearNotice

export interface Notice {
  text: string
  kind: 'success' | 'error' | 'info'
}

export type NoticeState = Notice | null

// auth

export interface SetAuthStatus {
  type: AuthActionTypes.SET_AUTH_STATUS
  payload: boolean
}

export type AuthActions = SetAuthStatus

export type AuthState = boolean

// user

export interface SetUser {
  type: typeof UserActionTypes.SET_USER
  payload: User
}

export type UserActions = SetUser

export interface User {
  id: string
  username: string
  avatar: string | null
}

export type UserState = User | null

// messages

export interface SetMessages {
  type: typeof MessagesActionTypes.SET_MESSAGES
  payload: Message[]
}

export type MessagesActions = SetMessages

export interface Message {
  user_id: string
  username: string
  avatar: string | null
  message_id: string
  text: string
}

export type MessagesState = Message[] | null
