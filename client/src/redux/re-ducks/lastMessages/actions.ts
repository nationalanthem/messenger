import { LastMessageFromUser } from '../../../api/messages.api'
import { SetLastMessages, SetLastUserMessage, LastMessageFromDialog, AddNewMessage } from '../types'

export enum LastMessagesActionTypes {
  SET_LAST_MESSAGES = 'lastMessages/SET_LAST_MESSAGES',
  SET_LAST_USER_MESSAGE = 'lastMessages/SET_LAST_USER_MESSAGE',
  ADD_NEW_MESSAGE = 'lastMessages/ADD_NEW_MESSAGE',
}

export const setLastMessages = (payload: LastMessageFromUser[]): SetLastMessages => {
  return {
    type: LastMessagesActionTypes.SET_LAST_MESSAGES,
    payload,
  }
}

export const setLastUserMessage = (payload: LastMessageFromDialog): SetLastUserMessage => {
  return {
    type: LastMessagesActionTypes.SET_LAST_USER_MESSAGE,
    payload,
  }
}

export const addNewMessage = (payload: LastMessageFromUser): AddNewMessage => {
  return {
    type: LastMessagesActionTypes.ADD_NEW_MESSAGE,
    payload,
  }
}
