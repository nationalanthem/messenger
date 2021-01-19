import axios from 'axios'
import { AxiosResponse } from 'axios'
import { User, Message } from './types'

export interface DialogData extends User {
  messages: DialogMessage[]
}

export type DialogMessage = Message & { type: 'to' | 'from' }

export interface LastMessageFromUser extends Omit<User, 'last_seen'> {
  lastMessage: Message
}

type GetLastMessageFromEachUserResponse = LastMessageFromUser[]
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
