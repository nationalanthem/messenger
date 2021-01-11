import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../../api/auth.api'
import './login.page.scss'

interface LoginFormInputs {
  username: string
  password: string
}

const LoginPage = () => {
  const [loginError, setLoginError] = useState<string>()

  const { register, handleSubmit } = useForm<LoginFormInputs>()

  const onSubmit = handleSubmit(async (data) => {
    setLoginError(undefined)

    try {
      const response = await auth.login(data.username, data.password)
      const { token } = response.data
      localStorage.setItem('token', token)
      window.location.href = '/'
    } catch (error) {
      setLoginError(error.response.data.message)
    }
  })

  return (
    <>
      {loginError && <div className="login-error">{loginError}</div>}

      <form className="register-form" onSubmit={onSubmit}>
        <div className="form-field">
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            className="input-field"
            type="input"
            name="username"
            defaultValue={localStorage.getItem('username') || ''}
            ref={register}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="username">Пароль</label>
          <input
            id="password"
            className="input-field"
            type="password"
            name="password"
            ref={register}
            required
          />
        </div>

        <button className="submit-button" type="submit">
          Войти
        </button>
      </form>
    </>
  )
}

export default LoginPage
