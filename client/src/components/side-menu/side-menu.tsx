import SideMenuFilter from '../side-menu-filter/side-menu-filter'
import PersonItem from '../person-item/person-item'
import './side-menu.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectLastMessages } from '../../redux/re-ducks/lastMessages/selectors'
import { setDialogUserId } from '../../redux/re-ducks/dialog/actions'
import { selectUserId } from '../../redux/re-ducks/dialog/selectors'
import MyProfile from '../my-profile/my-profile'
import { selectMyUsername } from '../../redux/re-ducks/user/selectors'
import { selectFilter } from '../../redux/re-ducks/filter/selectors'
import { useState } from 'react'
import { GetUsersByUsernameResponse, userAPI } from '../../api/user.api'
import { clearFilter } from '../../redux/re-ducks/filter/actions'

const SideMenu = () => {
  const dispatch = useDispatch()

  const [foundUsers, setFoundUsers] = useState<GetUsersByUsernameResponse['users']>([])

  const handleFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value.replace(/[^a-zA-Z0-9_]/g, '').trim()

    if (!str) {
      setFoundUsers([])
      return
    }

    userAPI.getUsersByUsername(str).then((response) => {
      setFoundUsers(response.data.users)
    })
  }

  const handleFilterClearClick = () => {
    dispatch(clearFilter())
  }

  const messages = useSelector(selectLastMessages)
  const current_user_id = useSelector(selectUserId)
  const myUsername = useSelector(selectMyUsername)

  const filter = useSelector(selectFilter)

  return (
    <div className="side-menu">
      <SideMenuFilter />
      <div className="person-list">
        {filter === 'search_users' ? (
          <>
            <div className="filter">
              <button className="filter__clear" type="button" onClick={handleFilterClearClick}>
                Назад
              </button>
              <input
                className="filter__input"
                placeholder="Имя пользователя..."
                type="text"
                onChange={handleFilterInputChange}
              />
            </div>
            {foundUsers.map((user) => {
              return (
                <PersonItem
                  key={user.user_id}
                  username={user.username}
                  user_id={user.user_id}
                  requestDispatchUserId={() => {
                    if (current_user_id === user.user_id) return
                    dispatch(setDialogUserId(user.user_id))
                  }}
                />
              )
            })}
          </>
        ) : messages.length ? (
          messages.map((msg) => {
            return (
              <PersonItem
                key={msg.user_id}
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
        ) : null}
      </div>
      {myUsername && <MyProfile username={myUsername} />}
    </div>
  )
}

export default SideMenu
