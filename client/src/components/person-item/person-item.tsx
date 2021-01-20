import './person-item.scss'
import Avatar from '../avatar/avatar'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../redux/re-ducks/dialog/selectors'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

interface PersonItemProps {
  username: string
  text?: string
  timestamp?: string
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
  const currentUserId = useSelector(selectUserId)

  const className = `person-item${currentUserId === user_id ? ' person-item--active' : ''}`

  return (
    <div title={username} onClick={requestDispatchUserId} className={className}>
      <Avatar size={30}>{username}</Avatar>
      <div className="person-item__main">
        <h2 className="person-item__main__username">{username}</h2>
        {text != null && timestamp != null && (
          <div className="person-item__main__message">
            <p className="person-item__main__message__content">{text}</p>
            <p className="person-item__main__message__timestamp">
              {format(new Date(+timestamp), 'EEEEEE', {
                locale: ru,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonItem
