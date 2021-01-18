import { AxiosResponse } from 'axios'
import axios from 'axios'

interface LoginResponse {
  token: string
}

export const auth = {
  register(username: string, password: string) {
    return axios.post('/api/register', { username, password })
  },

  login(username: string, password: string): Promise<AxiosResponse<LoginResponse>> {
    return axios.post('/api/login', { username, password })
  },
}
