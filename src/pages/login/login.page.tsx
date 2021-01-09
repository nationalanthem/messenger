import { useForm } from 'react-hook-form'
import './login.page.scss'

interface LoginFormInputs {
  username: string
  password: string
}

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>()

  const onSubmit = handleSubmit(async (data) => {})

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="username">Имя пользователя</label>
        <input id="username" className="input-field" type="input" name="username" ref={register} />
      </div>

      <div className="form-field">
        <label htmlFor="username">Пароль</label>
        <input
          id="password"
          className="input-field"
          type="password"
          name="password"
          ref={register}
        />
      </div>

      <button className="submit-button" type="submit">
        Войти
      </button>
    </form>
  )
}

export default RegisterPage
