import './message.scss'

interface MessageProps {
  type: 'to' | 'from'
  text: string
  timestamp: string
}

const Message: React.FC<MessageProps> = ({ type, text, timestamp }) => {
  return (
    <div className={`message message--${type}`}>
      <div className="message__text">{text}</div>
      <div className="message__timestamp">{timestamp}</div>
    </div>
  )
}

export default Message
