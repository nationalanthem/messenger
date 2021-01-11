import Message from '../message/message'
import './message-box.scss'

const MessageBox = () => {
  return (
    <div className="message-box">
      <Message type="to" />
      <Message type="from" />
      <Message type="to" />
      <Message type="from" />
      <Message type="to" />
      <Message type="from" />
      <Message type="to" />
      <Message type="from" />
      <Message type="to" />
      <Message type="from" />
      <Message type="to" />
      <Message type="from" />
    </div>
  )
}

export default MessageBox
