import { LastMessageFromUser } from '../../../api/messages.api'
import {
  SetLastUserMessage,
  LastMessageFromDialog,
  AddNewMessage,
  FetchLastMessagesSuccess,
  FetchLastMessagesStart,
} from '../types'

export enum LastMessagesActionTypes {
  FETCH_LAST_MESSAGES_START = 'lastMessages/FETCH_LAST_MESSAGES_START',
  FETCH_LAST_MESSAGES_SUCCESS = 'lastMessages/FETCH_LAST_MESSAGES_SUCCESS',
  SET_LAST_USER_MESSAGE = 'lastMessages/SET_LAST_USER_MESSAGE',
  ADD_NEW_MESSAGE = 'lastMessages/ADD_NEW_MESSAGE',
}

export const fetchLastMessagesStart = (): FetchLastMessagesStart => {
  return {
    type: LastMessagesActionTypes.FETCH_LAST_MESSAGES_START,
  }
}

export const fetchLastMessagesSuccess = (
  payload: LastMessageFromUser[]
): FetchLastMessagesSuccess => {
  return {
    type: LastMessagesActionTypes.FETCH_LAST_MESSAGES_SUCCESS,
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
