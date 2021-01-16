import { LastMessageFromEachUser } from '../../../api/messages.api'
import { SetMessages } from '../types'

export enum MessagesActionTypes {
  SET_MESSAGES = 'message/SET_MESSAGES',
}

export const setMessages = (payload: LastMessageFromEachUser[]): SetMessages => {
  return {
    type: MessagesActionTypes.SET_MESSAGES,
    payload,
  }
}
