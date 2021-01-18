// import SideMenuFilter from '../side-menu-filter/side-menu-filter'
import PersonItem from '../person-item/person-item'
import './side-menu.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessages } from '../../redux/re-ducks/messages/selectors'
import { setDialogUserId } from '../../redux/re-ducks/dialog/actions'

const SideMenu = () => {
  const dispatch = useDispatch()

  const messages = useSelector(selectMessages)

  return (
    <div className="side-menu">
      {/* <SideMenuFilter /> */}
      {messages
        ? messages.map((msg) => {
            return (
              <PersonItem
                key={msg.lastMessage.message_id}
                username={msg.username}
                text={msg.lastMessage.text}
                timestamp={msg.lastMessage.created_at}
                user_id={msg.user_id}
                requestDispatchUserId={() => void dispatch(setDialogUserId(msg.user_id))}
              />
            )
          })
        : null}
    </div>
  )
}

export default SideMenu
