import axios from 'axios'
import { AxiosResponse } from 'axios'
import { User } from './types'

type GetMyUserdataResponse = User

export const userAPI = {
  getMyUserdata(): Promise<AxiosResponse<GetMyUserdataResponse>> {
    return axios.get('/api/user/me')
  },
}
