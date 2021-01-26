import { Dispatch } from 'redux'
import { messagesAPI } from '../../../api/messages.api'
import { setLastUserMessage } from '../lastMessages/actions'
import { DialogActions, LastMessagesActions } from '../types'
import { fetchDialogDataStart, fetchDialogDataSuccess } from './actions'

export const fetchDialogData = (user_id: number) => async (
  dispatch: Dispatch<DialogActions | LastMessagesActions>
) => {
  dispatch(fetchDialogDataStart())

  const response = await messagesAPI.getDialogData(user_id)

  const messages = response.data.messages
  const lastMessage = messages.length ? messages[messages.length - 1] : null
  dispatch(setLastUserMessage({ user_id, lastMessage }))

  dispatch(fetchDialogDataSuccess(response.data))
}
