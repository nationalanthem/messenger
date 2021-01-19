import SideMenu from './components/side-menu/side-menu'
import DialogWindow from './components/dialog-window/dialog-window'
import RegisterPage from './pages/register/register.page'
import LoginPage from './pages/login/login.page'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoggedOutRoute from './logged-out-route'
import { Toaster } from 'react-hot-toast'
import { useNotice } from './hooks/useNotice'
import { useAuth } from './hooks/useAuth'
import { useStorageChange } from './hooks/useStorageChange'
import './app.scss'

const App = () => {
  const isAuth = useAuth()
  useStorageChange()
  useNotice()

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
