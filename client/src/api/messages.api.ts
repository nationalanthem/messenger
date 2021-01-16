import { AxiosResponse } from 'axios'
import axios from '../config/axios.config'

export interface DialogData {
  user_id: string
  username: string
  avatar: string | null
  messages: {
    message_id: string
    text: string
    type: 'to' | 'from'
  }[]
}

export interface LastMessageFromEachUser {
  user_id: number
  username: string
  avatar: string | null
  lastMessage: {
    message_id: string
    text: string
  }
}

type GetLastMessageFromEachUserResponse = LastMessageFromEachUser[]
interface GetDialogDataResponse extends DialogData {}

export const messagesAPI = {
  getLastMessageFromEachUser(): Promise<AxiosResponse<GetLastMessageFromEachUserResponse>> {
    return axios.get('/api/messages/last')
  },
  getDialogData(id: number): Promise<AxiosResponse<GetDialogDataResponse>> {
    return axios.get(`/api/messages/from/${id}`)
  },
  sendMessageToUser(id: number, text: string) {
    return axios.post(`/api/messages/sendTo/${id}`, { text })
  },
}
