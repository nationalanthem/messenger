import SideMenu from './components/side-menu/side-menu'
import DialogWindow from './components/dialog-window/dialog-window'
import RegisterPage from './pages/register/register.page'
import LoginPage from './pages/login/login.page'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './app.scss'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="app">
            <SideMenu />
            <DialogWindow />
          </div>
        </Route>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  )
}

export default App
