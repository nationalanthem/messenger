import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DialogMessage, messagesAPI } from '../../api/messages.api'
import { addDialogMessage } from '../../redux/re-ducks/dialog/actions'
import { selectUserId } from '../../redux/re-ducks/dialog/selectors'
import { setLastUserMessage } from '../../redux/re-ducks/lastMessages/actions'
import './message-submit.scss'

const MessageSubmit = () => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const user_id = useSelector(selectUserId)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text || !user_id) return

    const message: DialogMessage = {
      message_id: Date.now().toString(),
      text,
      created_at: Date.now().toString(),
      type: 'to',
    }

    dispatch(addDialogMessage(message))

    dispatch(setLastUserMessage({ user_id, lastMessage: message }))

    messagesAPI.sendMessageToUser(user_id, text)

    setText('')
  }

  return (
    <form onSubmit={handleFormSubmit}>
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
