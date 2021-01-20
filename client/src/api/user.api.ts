import axios from 'axios'
import { AxiosResponse } from 'axios'
import { User } from './types'

type GetMyUserdataResponse = User

export interface GetUsersByUsernameResponse {
  users: Omit<User, 'last_seen'>[]
}

export const userAPI = {
  getMyUserdata(): Promise<AxiosResponse<GetMyUserdataResponse>> {
    return axios.get('/api/user/me')
  },
  getUsersByUsername(username: string): Promise<AxiosResponse<GetUsersByUsernameResponse>> {
    return axios.get(`/api/user/${username}`)
  },
}
