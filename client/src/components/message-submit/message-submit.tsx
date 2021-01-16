import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messagesAPI } from '../../api/messages.api'
import { selectDialogUserId } from '../../redux/re-ducks/dialog/selectors'
import { setNotice } from '../../redux/re-ducks/notice/actions'
import './message-submit.scss'

const MessageSubmit = () => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const userId = useSelector(selectDialogUserId)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text || !userId) return
    messagesAPI
      .sendMessageToUser(userId, text)
      .then(() => {
        setText('')
        dispatch(setNotice({ text: 'Сообщение отправлено!', kind: 'success' }))
      })
      .catch((err) => {
        alert('Произошла ошибка')
      })
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
