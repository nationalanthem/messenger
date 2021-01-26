import axios from 'axios'
import { User } from './types'

type GetMyUserdataResponse = User

export interface GetUsersByUsernameResponse {
  users: Array<Omit<User, 'last_seen'>>
}

export const userAPI = {
  getMyUserdata() {
    return axios.get<GetMyUserdataResponse>('/api/user/me')
  },
  getUsersByUsername(username: string) {
    return axios.get<GetUsersByUsernameResponse>(`/api/user/${username}`)
  },
}
