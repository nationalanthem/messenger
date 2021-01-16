import { DialogData } from '../../api/messages.api'
import Message from '../message/message'
import './message-box.scss'

interface MessageBoxProps {
  messages: DialogData['messages']
}

const MessageBox: React.FC<MessageBoxProps> = ({ messages }) => {
  return (
    <div className="message-box">
      {/* <Message type="to" />
      <Message type="from" /> */}

      {messages
        ? messages.map((message) => (
            <Message
              key={message.message_id}
              text={message.text}
              timestamp={'11:59 PM'}
              type={message.type}
            />
          ))
        : null}
    </div>
  )
}

export default MessageBox
