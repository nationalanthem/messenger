import { useMessageSubmit } from './useMessageSubmit'
import './message-submit.scss'

interface MessageSubmitProps {
  username: string
  avatar: string | null
  user_id: number
}

const MessageSubmit: React.FC<MessageSubmitProps> = ({ username, avatar, user_id }) => {
  const { text, handleInputChange, handleSubmit } = useMessageSubmit(user_id, avatar, username)

  return (
    <form onSubmit={handleSubmit}>
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
