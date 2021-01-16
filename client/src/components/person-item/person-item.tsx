import './person-item.scss'
import Avatar from '../avatar/avatar'
import { useSelector } from 'react-redux'
import { selectDialogUserId } from '../../redux/re-ducks/dialog/selectors'

interface PersonItemProps {
  username: string
  text: string
  timestamp: string
  user_id: number
  requestDispatchUserId: () => void
}

const PersonItem: React.FC<PersonItemProps> = ({
  username,
  text,
  timestamp,
  user_id,
  requestDispatchUserId,
}) => {
  const currentDialogUserId = useSelector(selectDialogUserId)

  const className = `person-item${currentDialogUserId === user_id ? ' person-item--active' : ''}`

  return (
    <div onClick={requestDispatchUserId} className={className}>
      <Avatar size={30}>{username}</Avatar>
      <div className="person-item__main">
        <h2 className="person-item__main__username">{username}</h2>
        <div className="person-item__main__message">
          <p className="person-item__main__message__content">{text}</p>
          <p className="person-item__main__message__timestamp">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default PersonItem
