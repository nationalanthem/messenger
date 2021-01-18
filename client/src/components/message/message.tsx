import './message.scss'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

interface MessageProps {
  type: 'to' | 'from'
  text: string
  timestamp: string
}

const ONE_DAY = 86400000

const Message: React.FC<MessageProps> = ({ type, text, timestamp }) => {
  return (
    <div className={`message message--${type}`}>
      <div className="message__text">{text}</div>
      <div className="message__timestamp">
        {format(new Date(+timestamp), Date.now() - +timestamp >= ONE_DAY ? 'd.MM, H:mm' : 'H:mm', {
          locale: ru,
        })}
      </div>
    </div>
  )
}

export default Message
