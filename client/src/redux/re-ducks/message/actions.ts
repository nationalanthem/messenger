import { Message, SetMessage, ClearMessage } from '../types'

export enum MessageActionTypes {
  SET_MESSAGE = 'message/SET_MESSAGE',
  CLEAR_MESSAGE = 'message/CLEAR_MESSAGE',
}

export const setMessage = (payload: Message): SetMessage => {
  return {
    type: MessageActionTypes.SET_MESSAGE,
    payload,
  }
}

export const clearMessage = (): ClearMessage => {
  return {
    type: MessageActionTypes.CLEAR_MESSAGE,
  }
}
