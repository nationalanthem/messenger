import axios from 'axios'

interface LoginResponse {
  token: string
}

export const auth = {
  register(username: string, password: string) {
    return axios.post('/api/register', { username, password })
  },

  login(username: string, password: string) {
    return axios.post<LoginResponse>('/api/login', { username, password })
  },
}
