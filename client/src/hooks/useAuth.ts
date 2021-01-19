import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAxiosHeaders } from '../config/axios.config'
import { selectAuthStatus } from '../redux/re-ducks/auth/selectors'
import { fetchLastMessages } from '../redux/re-ducks/lastMessages/effects'
import { fetchUser } from '../redux/re-ducks/user/effects'

export const useAuth = () => {
  const dispatch = useDispatch()

  const isAuth = useSelector(selectAuthStatus)

  useEffect(() => {
    if (isAuth) {
      updateAxiosHeaders()
      dispatch(fetchUser())
      dispatch(fetchLastMessages())
    }
  }, [isAuth, dispatch])

  return isAuth
}
