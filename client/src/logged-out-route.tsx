import { Redirect, Route } from 'react-router-dom'

interface LoggedOutRouteProps {
  isAuth: boolean
  path: string
  component: React.FC
}

const LoggedOutRoute: React.FC<LoggedOutRouteProps> = ({
  isAuth,
  path,
  component: Component,
  children,
}) => {
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Route path={path} component={Component}>
      {children}
    </Route>
  )
}

export default LoggedOutRoute
