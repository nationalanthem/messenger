import { io } from 'socket.io-client'

export const socket = io()

export interface SendMsgPayload {
  text: string
  room_id: number
  from_user: number
  to_user: number
  type: 'from' | 'to'
}

export interface UpdLastMessage {
  text: string
  from_user: number
  avatar: string | null
  username: string
}
