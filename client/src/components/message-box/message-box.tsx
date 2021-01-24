import { forwardRef } from 'react'
import { DialogData } from '../../api/messages.api'
import Message from '../message/message'
import './message-box.scss'

interface MessageBoxProps {
  messages: Readonly<DialogData['messages']>
}

const MessageBox = forwardRef<HTMLDivElement, MessageBoxProps>(({ messages }, ref) => {
  return (
    <div className="message-box" ref={ref}>
      {messages.length ? (
        messages.map((message) => (
          <Message
            key={message.message_id}
            text={message.text}
            timestamp={message.created_at}
            type={message.type}
          />
        ))
      ) : (
        <p className="no-messages">Нет сообщений</p>
      )}
    </div>
  )
})

export default MessageBox
