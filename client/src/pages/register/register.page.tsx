import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './register.page.scss'
import { auth } from '../../api/auth.api'
import { useHistory } from 'react-router-dom'

interface RegisterFormInputs {
  username: string
  password: string
  confirmPassword: string
}

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(5, 'Имя пользователя может содержать не менее 5 символов')
    .max(15, 'Имя пользователя может содержать не более 15 символов')
    .matches(
      /^([a-zA-Z0-9_]+)$/,
      'Имя пользователя может содержать буквы латинского алфавита (A-Z), цифры (0-9), и нижнее подчёркивание (_)'
    )
    .trim(),
  password: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(6, 'Пароль может содержать не менее 6 символов')
    .max(16, 'Пароль может содержать не более 16 символов'),
  confirmPassword: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(6, 'Пароль может содержать не менее 6 символов')
    .max(16, 'Пароль может содержать не более 16 символов'),
})

const RegisterPage = () => {
  const [registerError, setRegisterError] = useState<string>()

  const history = useHistory()

  const { register, handleSubmit, errors, setError } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { type: 'notEqual', message: 'Пароли не совпадают' })
      return
    }

    setRegisterError(undefined)

    try {
      await auth.register(data.username, data.password)
      localStorage.setItem('username', data.username)
      history.push('/login')
    } catch (error) {
      setRegisterError(error.response.data.message)
    }
  })

  return (
    <>
      {registerError && <div className="register-error">{registerError}</div>}

      <form className="register-form" onSubmit={onSubmit}>
        <div className="form-field">
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            className="input-field"
            type="input"
            name="username"
            ref={register}
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
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
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="confirmPassword">Введите пароль повторно</label>
          <input
            id="confirmPassword"
            className="input-field"
            type="password"
            name="confirmPassword"
            ref={register}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button className="submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </>
  )
}

export default RegisterPage
