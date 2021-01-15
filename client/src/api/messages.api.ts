import { AxiosResponse } from 'axios'
import axios from '../config/axios.config'

interface GetAllMessagesResponse {
  messages: {
    user_id: string
    username: string
    avatar: string | null
    message_id: string
    text: string
  }[]
}

export const messagesAPI = {
  getAllMessages(): Promise<AxiosResponse<GetAllMessagesResponse>> {
    return axios.get('/api/messages/all')
  },
}
