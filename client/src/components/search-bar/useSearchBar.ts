import debounce from 'debounce'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { GetUsersByUsernameResponse, userAPI } from '../../api/user.api'
import { clearFilter } from '../../redux/re-ducks/filter/actions'

export const useSearchBar = () => {
  const dispatch = useDispatch()

  const [foundUsers, setFoundUsers] = useState<GetUsersByUsernameResponse['users'] | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const db = useCallback(
    debounce(async (str: string) => {
      const usersRes = await userAPI.getUsersByUsername(str)
      setFoundUsers(usersRes.data.users)
      setIsLoading(false)
    }, 1000),
    []
  )

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const wrongStr = event.target.value.match(/[^a-zA-Z0-9_]/g)

    if (wrongStr) {
      db.clear()
      setFoundUsers(null)
      setIsLoading(false)
      setErrorMsg('Введены недопустимые символы')
      return
    }

    setErrorMsg(undefined)

    const str = event.target.value.trim()

    if (!str) {
      db.clear()
      setFoundUsers(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setFoundUsers(null)
    db(str)
  }

  const handleSearchClearClick = () => {
    dispatch(clearFilter())
    setFoundUsers(null)
  }

  return {
    handleSearchClearClick,
    handleSearchInputChange,
    foundUsers,
    isLoading,
    errorMsg,
    dispatch,
  }
}
