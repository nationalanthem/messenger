import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateAxiosHeaders } from '../config/axios.config'
import { setAuthStatus } from '../redux/re-ducks/auth/actions'
import { clearNotice } from '../redux/re-ducks/notice/actions'

export const useStorageChange = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleStorageChange = () => {
      dispatch(setAuthStatus(!!localStorage.getItem('token')))
      dispatch(clearNotice())
      updateAxiosHeaders()
    }

    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [dispatch])
}
