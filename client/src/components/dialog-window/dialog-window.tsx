import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDialogData } from '../../redux/re-ducks/dialog/effects'
import {
  isDialogLoading,
  selectDialogData,
  selectUserId,
} from '../../redux/re-ducks/dialog/selectors'
import DialogHeader from '../dialog-header/dialog-header'
import MessageBox from '../message-box/message-box'
import MessageSubmit from '../message-submit/message-submit'
import './dialog-window.scss'

const DialogWindow = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector(isDialogLoading)

  const user_id = useSelector(selectUserId)
  const dialogData = useSelector(selectDialogData)

  useEffect(() => {
    if (user_id != null) {
      dispatch(fetchDialogData(user_id))
    }
  }, [user_id, dispatch])

  if (user_id == null)
    return (
      <div className="idle-wrapper">
        <h2>Выберите диалог из списка или начните новый</h2>
      </div>
    )

  if (isLoading || !dialogData) return null

  return (
    <div className="dialog-window">
      <DialogHeader username={dialogData.username} timestamp={dialogData.last_seen} />
      <MessageBox messages={dialogData.messages} />
      <MessageSubmit />
    </div>
  )
}

export default DialogWindow
