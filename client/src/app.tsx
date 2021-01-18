import { useEffect } from 'react'
import SideMenu from './components/side-menu/side-menu'
import DialogWindow from './components/dialog-window/dialog-window'
import RegisterPage from './pages/register/register.page'
import LoginPage from './pages/login/login.page'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoggedOutRoute from './logged-out-route'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthStatus } from './redux/re-ducks/auth/selectors'
import { selectNotice } from './redux/re-ducks/notice/selectors'
import { clearNotice } from './redux/re-ducks/notice/actions'
import { setAuthStatus } from './redux/re-ducks/auth/actions'
import { fetchUser } from './redux/re-ducks/user/effects'
import { fetchMessages } from './redux/re-ducks/messages/effects'
import { updateAxiosHeaders } from './config/axios.config'

import './app.scss'

const App = () => {
  const dispatch = useDispatch()

  const isAuth = useSelector(selectAuthStatus)
  const message = useSelector(selectNotice)

  useEffect(() => {
    if (isAuth) {
      updateAxiosHeaders()
      dispatch(fetchUser())
      dispatch(fetchMessages())
    }
  }, [isAuth, dispatch])

  useEffect(() => {
    const handleStorageChange = () => {
      dispatch(setAuthStatus(!!localStorage.getItem('token')))
      dispatch(clearNotice())
      updateAxiosHeaders()
    }

    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [isAuth, dispatch])

  useEffect(() => {
    if (message) {
      const style = {
        borderRadius: '5px',
        background: '#333',
        color: '#fff',
      }

      switch (message.kind) {
        case 'success':
          toast.success(message.text, { style })
          break
        case 'error':
          toast.error(message.text, { style })
          break
        case 'info':
          toast(message.text, { style })
      }
    }
  }, [message])

  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Switch>
          <Route exact path="/">
            {isAuth ? (
              <div className="app">
                <SideMenu />
                <DialogWindow />
              </div>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <LoggedOutRoute path="/register" component={RegisterPage} isAuth={isAuth} />
          <LoggedOutRoute path="/login" component={LoginPage} isAuth={isAuth} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  )
}

export default App
