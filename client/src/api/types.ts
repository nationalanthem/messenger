export interface User {
  user_id: number
  username: string
  avatar: string | null
  last_seen: string
}

export interface Message {
  message_id: number
  text: string
  created_at: string
}
