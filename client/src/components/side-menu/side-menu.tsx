// import SideMenuFilter from '../side-menu-filter/side-menu-filter'
import PersonItem from '../person-item/person-item'
import './side-menu.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectLastMessages } from '../../redux/re-ducks/lastMessages/selectors'
import { setDialogUserId } from '../../redux/re-ducks/dialog/actions'
import { selectUserId } from '../../redux/re-ducks/dialog/selectors'

const SideMenu = () => {
  const dispatch = useDispatch()

  const messages = useSelector(selectLastMessages)
  const current_user_id = useSelector(selectUserId)

  return (
    <div className="side-menu">
      {/* <SideMenuFilter /> */}
      {messages.length
        ? messages.map((msg) => {
            return (
              <PersonItem
                key={msg.lastMessage.message_id}
                username={msg.username}
                text={msg.lastMessage.text}
                timestamp={msg.lastMessage.created_at}
                user_id={msg.user_id}
                requestDispatchUserId={() => {
                  if (current_user_id === msg.user_id) return
                  dispatch(setDialogUserId(msg.user_id))
                }}
              />
            )
          })
        : null}
    </div>
  )
}

export default SideMenu
