import axios from 'axios'
import { User, Message } from './types'

export interface DialogData extends User {
  room_id: number
  messages: DialogMessage[]
}

export type DialogMessage = Message & { type: 'to' | 'from' }

export interface LastMessageFromUser extends Omit<User, 'last_seen'> {
  lastMessage: Message | null
}

type GetLastMessageFromEachUserResponse = LastMessageFromUser[]
type GetDialogDataResponse = DialogData

export const messagesAPI = {
  getLastMessageFromEachUser() {
    return axios.get<GetLastMessageFromEachUserResponse>('/api/messages/last')
  },
  getDialogData(user_id: number) {
    return axios.get<GetDialogDataResponse>(`/api/messages/from/${user_id}`)
  },
  sendMessageToUser(room_id: number, text: string) {
    return axios.post(`/api/messages/sendTo/${room_id}`, { text })
  },
}
