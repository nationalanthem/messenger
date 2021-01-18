import Avatar from '../avatar/avatar'
import './dialog-header.scss'
import { ru } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

interface DialogHeaderProps {
  username: string
  timestamp: string
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ username, timestamp }) => {
  return (
    <div className="dialog-header">
      <Avatar size={50}>{username}</Avatar>
      <div className="dialog-header__info">
        <h1 title={username} className="dialog-header__info__username">
          {username}
        </h1>
        <p className="dialog-header__info__last-seen">
          Был(а) в сети {formatDistanceToNow(new Date(+timestamp), { locale: ru, addSuffix: true })}
        </p>
      </div>
    </div>
  )
}

export default DialogHeader
