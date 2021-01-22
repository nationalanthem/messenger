import PersonItem from '../person-item/person-item'
import { setDialogUserId } from '../../redux/re-ducks/dialog/actions'
import { useSearchBar } from './useSearchBar'
import './search-bar.scss'
import { CircularProgress } from '@material-ui/core'

interface SearchBarProps {
  currentUserId: number | null
}

const SearchBar: React.FC<SearchBarProps> = ({ currentUserId }) => {
  const {
    foundUsers,
    isLoading,
    errorMsg,
    handleSearchInputChange,
    handleSearchClearClick,
    dispatch,
  } = useSearchBar()

  return (
    <>
      <div className="search">
        <button className="search__clear" type="button" onClick={handleSearchClearClick}>
          Назад
        </button>
        <input
          className="search__input"
          placeholder="Имя пользователя..."
          type="text"
          onChange={handleSearchInputChange}
        />
      </div>
      {foundUsers &&
        foundUsers.length > 0 &&
        foundUsers.map((user) => {
          return (
            <PersonItem
              key={user.user_id}
              username={user.username}
              isSelected={currentUserId === user.user_id}
              requestDispatchUserId={() => {
                if (currentUserId === user.user_id) return
                dispatch(setDialogUserId(user.user_id))
              }}
            />
          )
        })}
      {!isLoading && foundUsers == null && !errorMsg ? (
        <p className="search__idle">Начните вводить имя пользователя</p>
      ) : !isLoading && !foundUsers?.length && !errorMsg ? (
        <p className="search__not-found">Нет пользователей с таким именем</p>
      ) : !isLoading && errorMsg ? (
        <p className="search__error">{errorMsg}</p>
      ) : (
        isLoading && (
          <div className="search__loading">
            <CircularProgress />
          </div>
        )
      )}
    </>
  )
}

export default SearchBar
