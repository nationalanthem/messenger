import { Dispatch } from 'redux'
import { messagesAPI } from '../../../api/messages.api'
import { LastMessagesActions } from '../types'
import { fetchLastMessagesStart, fetchLastMessagesSuccess } from './actions'

export const fetchLastMessages = () => async (dispatch: Dispatch<LastMessagesActions>) => {
  dispatch(fetchLastMessagesStart())

  const response = await messagesAPI.getLastMessageFromEachUser()

  dispatch(fetchLastMessagesSuccess(response.data))
}
