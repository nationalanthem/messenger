import { Dispatch } from 'redux'
import { messagesAPI } from '../../../api/messages.api'
import { LastMessagesActions } from '../types'
import { setLastMessages } from './actions'

export const fetchLastMessages = () => (dispatch: Dispatch<LastMessagesActions>) => {
  return messagesAPI.getLastMessageFromEachUser().then((response) => {
    dispatch(setLastMessages(response.data))
  })
}
