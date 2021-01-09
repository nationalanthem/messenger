import DialogHeader from '../dialog-header/dialog-header'
import MessageBox from '../message-box/message-box'
import MessageSubmit from '../message-submit/message-submit'
import './dialog-window.scss'

const DialogWindow = () => {
  return (
    <div className="dialog-window">
      <DialogHeader />
      <MessageBox />
      <MessageSubmit />
    </div>
  )
}

export default DialogWindow
