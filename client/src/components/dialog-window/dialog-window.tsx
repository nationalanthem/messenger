import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DialogData, messagesAPI } from '../../api/messages.api'
import { selectUserId } from '../../redux/re-ducks/dialog/selectors'
import DialogHeader from '../dialog-header/dialog-header'
import MessageBox from '../message-box/message-box'
import MessageSubmit from '../message-submit/message-submit'
import './dialog-window.scss'

const DialogWindow = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [messagesFromUser, setMessagesFromUser] = useState<DialogData>()

  const userId = useSelector(selectUserId)

  useEffect(() => {
    if (userId) {
      setIsLoading(true)
      messagesAPI.getDialogData(userId).then((response) => {
        setMessagesFromUser(response.data)
        setIsLoading(false)
      })
    }
  }, [userId])

  if (!userId)
    return (
      <div className="idle-wrapper">
        <h2>Выберите диалог из списка или начните новый</h2>
      </div>
    )

  if (!messagesFromUser || isLoading) return null

  return (
    <div className="dialog-window">
      <DialogHeader username={messagesFromUser.username} />
      <MessageBox messages={messagesFromUser.messages} />
      <MessageSubmit />
    </div>
  )
}

export default DialogWindow
