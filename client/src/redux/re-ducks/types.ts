import { NoticeActionTypes } from './notice/actions'
import { AuthActionTypes } from './auth/actions'
import { UserActionTypes } from './user/actions'
import { LastMessagesActionTypes } from './lastMessages/actions'
import { DialogActionTypes } from './dialog/actions'
import { FilterActionTypes } from './filter/actions'

import { DialogData, DialogMessage, LastMessageFromUser } from '../../api/messages.api'
import { User } from '../../api/types'

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

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

export type UserState = Omit<User, 'last_seen'> | null

// lastMessages

export interface FetchLastMessagesStart {
  type: typeof LastMessagesActionTypes.FETCH_LAST_MESSAGES_START
}
export interface FetchLastMessagesSuccess {
  type: typeof LastMessagesActionTypes.FETCH_LAST_MESSAGES_SUCCESS
  payload: LastMessageFromUser[]
}

export type LastMessageFromDialog = Pick<LastMessageFromUser, 'user_id' | 'lastMessage'>

export interface SetLastUserMessage {
  type: typeof LastMessagesActionTypes.SET_LAST_USER_MESSAGE
  payload: LastMessageFromDialog
}

export interface AddNewMessage {
  type: typeof LastMessagesActionTypes.ADD_NEW_MESSAGE
  payload: LastMessageFromUser
}

export type LastMessagesActions =
  | FetchLastMessagesStart
  | FetchLastMessagesSuccess
  | SetLastUserMessage
  | AddNewMessage

export interface LastMessagesState {
  messages: LastMessageFromUser[]
  status: LoadingState
}

// dialog

export interface SetDialogUserId {
  type: typeof DialogActionTypes.SET_DIALOG_USER_ID
  payload: number
}

export interface AddDialogMessage {
  type: typeof DialogActionTypes.ADD_DIALOG_MESSAGE
  payload: DialogMessage
}

export interface UpdateLastSeen {
  type: typeof DialogActionTypes.UPDATE_LAST_SEEN
}

export interface FetchDialogDataStart {
  type: typeof DialogActionTypes.FETCH_DIALOG_START
}
export interface FetchDialogDataSuccess {
  type: typeof DialogActionTypes.FETCH_DIALOG_SUCCESS
  payload: DialogData
}

export type DialogActions =
  | SetDialogUserId
  | AddDialogMessage
  | UpdateLastSeen
  | FetchDialogDataStart
  | FetchDialogDataSuccess

export interface DialogState {
  current_user_id: number | null
  data: DialogData | null
  status: LoadingState
}

// filter

export type SearchFilter = 'search_users'

export interface SetFilter {
  type: typeof FilterActionTypes.SET_FILTER
  payload: SearchFilter
}

export interface ClearFilter {
  type: typeof FilterActionTypes.CLEAR_FILTER
}

export type FilterActions = SetFilter | ClearFilter

export type FilterState = SearchFilter | null
