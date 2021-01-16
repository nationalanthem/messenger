import { Dispatch } from 'redux'
import { messagesAPI } from '../../../api/messages.api'
import { MessagesActions } from '../types'
import { setMessages } from './actions'

export const fetchMessages = () => (dispatch: Dispatch<MessagesActions>) => {
  return messagesAPI.getLastMessageFromEachUser().then((response) => {
    dispatch(setMessages(response.data))
  })
}
