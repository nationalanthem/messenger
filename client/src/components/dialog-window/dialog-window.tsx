import DialogHeader from '../dialog-header/dialog-header'
import MessageBox from '../message-box/message-box'
import MessageSubmit from '../message-submit/message-submit'
import { useDialogWindow } from './useDialogWindow'
import { CircularProgress } from '@material-ui/core'
import './dialog-window.scss'

const DialogWindow = () => {
  const { dialogData, user_id, isLoading, msgBoxRef } = useDialogWindow()

  if (user_id == null)
    return (
      <div className="idle-wrapper">
        <h2>Выберите диалог из списка или начните новый</h2>
      </div>
    )

  if (isLoading || !dialogData)
    return (
      <div className="dialog-window-loading">
        <CircularProgress />
      </div>
    )

  return (
    <div className="dialog-window">
      <DialogHeader username={dialogData.username} timestamp={dialogData.last_seen} />
      <MessageBox messages={dialogData.messages} ref={msgBoxRef} />
      <MessageSubmit
        username={dialogData.username}
        avatar={dialogData.avatar}
        user_id={dialogData.user_id}
      />
    </div>
  )
}

export default DialogWindow
