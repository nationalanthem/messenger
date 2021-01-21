import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DialogMessage, messagesAPI } from '../../api/messages.api'
import { addDialogMessage } from '../../redux/re-ducks/dialog/actions'
import { selectDialogData, selectUserId } from '../../redux/re-ducks/dialog/selectors'
import { addNewMessage, setLastUserMessage } from '../../redux/re-ducks/lastMessages/actions'
import { selectIsUserInMessagesList } from '../../redux/re-ducks/lastMessages/selectors'
import './message-submit.scss'

const MessageSubmit = () => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const user_id = useSelector(selectUserId)!
  const dialogData = useSelector(selectDialogData)
  const userIsInMessagesList = useSelector(selectIsUserInMessagesList(user_id))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text.trim() || !dialogData) return

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
          avatar: dialogData.avatar,
          user_id,
          username: dialogData.username,
          lastMessage: message,
        })
      )
    }

    messagesAPI.sendMessageToUser(user_id, text)

    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="message-input"
        onChange={handleInputChange}
        value={text}
        placeholder="Введите сообщение..."
      />
    </form>
  )
}

export default MessageSubmit
