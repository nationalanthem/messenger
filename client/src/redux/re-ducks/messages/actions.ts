import { SetMessages, Message } from '../types'

export enum MessagesActionTypes {
  SET_MESSAGES = 'message/SET_MESSAGES',
}

export const setMessages = (payload: Message[]): SetMessages => {
  return {
    type: MessagesActionTypes.SET_MESSAGES,
    payload,
  }
}
