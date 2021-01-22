import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DialogMessage, messagesAPI } from '../../api/messages.api'
import { addDialogMessage } from '../../redux/re-ducks/dialog/actions'
import { setLastUserMessage, addNewMessage } from '../../redux/re-ducks/lastMessages/actions'
import { selectIsUserInMessagesList } from '../../redux/re-ducks/lastMessages/selectors'

export const useMessageSubmit = (user_id: number, avatar: string | null, username: string) => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const userIsInMessagesList = useSelector(selectIsUserInMessagesList(user_id))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text.trim()) return

    const message: DialogMessage = {
      message_id: Date.now().toString(),
      text,
      created_at: Date.now().toString(),
      type: 'to',
    }

    dispatch(addDialogMessage(message))

    if (userIsInMessagesList) {
      dispatch(setLastUserMessage({ user_id, lastMessage: message }))
    } else {
      dispatch(
        addNewMessage({
          avatar,
          user_id,
          username,
          lastMessage: message,
        })
      )
    }

    messagesAPI.sendMessageToUser(user_id, text)

    setText('')
  }

  return {
    handleSubmit,
    handleInputChange,
    text,
  }
}
