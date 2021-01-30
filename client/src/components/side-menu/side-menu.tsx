import SideMenuFilter from '../side-menu-filter/side-menu-filter'
import PersonItem from '../person-item/person-item'
import { setDialogUserId } from '../../redux/re-ducks/dialog/actions'
import MyProfile from '../my-profile/my-profile'
import SearchBar from '../search-bar/search-bar'
import { CircularProgress } from '@material-ui/core'
import useSideMenu from './useSideMenu'
import './side-menu.scss'

const SideMenu = () => {
  const {
    filter,
    current_user_id,
    messages,
    dispatch,
    isMessagesLoading,
    myUsername,
  } = useSideMenu()

  return (
    <div className="side-menu">
      <SideMenuFilter currentFilter={filter} />
      <div className="person-list">
        {filter === 'search_users' ? (
          <SearchBar currentUserId={current_user_id} />
        ) : messages.length ? (
          messages.map((msg) => {
            return (
              <PersonItem
                key={msg.user_id}
                username={msg.username}
                text={msg.lastMessage?.text}
                timestamp={msg.lastMessage?.created_at}
                isSelected={current_user_id === msg.user_id}
                requestDispatchUserId={() => {
                  if (current_user_id === msg.user_id) return
                  dispatch(setDialogUserId(msg.user_id))
                }}
              />
            )
          })
        ) : isMessagesLoading ? (
          <div className="person-list__loading">
            <CircularProgress size={60} />
          </div>
        ) : (
          <p className="person-list__messages-empty">Нет диалогов</p>
        )}
      </div>
      {myUsername ? (
        <MyProfile username={myUsername} />
      ) : (
        <div className="side-menu__my-profile-loading">
          <CircularProgress size={30} />
        </div>
      )}
    </div>
  )
}

export default SideMenu
