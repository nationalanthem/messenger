import Avatar from '../avatar/avatar'
import './dialog-header.scss'

interface DialogHeaderProps {
  username: string
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ username }) => {
  return (
    <div className="dialog-header">
      <div className="dialog-header__user">
        <Avatar size={50}>{username}</Avatar>
        <div className="dialog-header__user__info">
          <h1 className="dialog-header__user__info__username">{username}</h1>
          <p className="dialog-header__user__info__last-seen">
            Был в сети {Math.trunc(Math.random() * 59 + 1)} минут назад
          </p>
        </div>
      </div>
    </div>
  )
}

export default DialogHeader
