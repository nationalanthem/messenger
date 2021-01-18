import axios from 'axios'
import { AxiosResponse } from 'axios'
import { User, Message } from './types'

export interface DialogData extends User {
  messages: Array<Message & { type: 'to' | 'from' }>
}

export interface LastMessageFromEachUser extends Omit<User, 'last_seen'> {
  lastMessage: Message
}

type GetLastMessageFromEachUserResponse = LastMessageFromEachUser[]
type GetDialogDataResponse = DialogData

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
