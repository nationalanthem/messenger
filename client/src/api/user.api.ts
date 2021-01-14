import { AxiosResponse } from 'axios'
import axios from '../config/axios.config'

interface GetMyUserdataResponse {
  id: number
  username: string
  avatar: string | null
}

export const userAPI = {
  getMyUserdata(): Promise<AxiosResponse<GetMyUserdataResponse>> {
    return axios.get('/api/user/me')
  },
}
