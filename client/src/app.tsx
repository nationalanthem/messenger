import SideMenu from './components/side-menu/side-menu'
import DialogWindow from './components/dialog-window/dialog-window'
import RegisterPage from './pages/register/register.page'
import LoginPage from './pages/login/login.page'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import './app.scss'

const App = () => {
  const isAuth = !!localStorage.getItem('token')

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAuth ? (
            <div className="app">
              <SideMenu />
              <DialogWindow />
            </div>
          ) : (
            <Redirect to="/register" />
          )}
        </Route>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  )
}

export default App
