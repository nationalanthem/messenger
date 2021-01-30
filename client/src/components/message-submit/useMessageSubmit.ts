import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DialogMessage, messagesAPI } from '../../api/messages.api'
import { addDialogMessage } from '../../redux/re-ducks/dialog/actions'
import { selectRoomId } from '../../redux/re-ducks/dialog/selectors'
import { setLastUserMessage, addNewMessage } from '../../redux/re-ducks/lastMessages/actions'
import { selectIsUserInMessagesList } from '../../redux/re-ducks/lastMessages/selectors'
import { selectMyAvatar, selectMyId, selectMyUsername } from '../../redux/re-ducks/user/selectors'
import { socket } from '../../socket'

export const useMessageSubmit = (user_id: number, avatar: string | null, username: string) => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const userIsInMessagesList = useSelector(selectIsUserInMessagesList(user_id))
  const room_id = useSelector(selectRoomId)
  const myUserId = useSelector(selectMyId)
  const myAvatar = useSelector(selectMyAvatar)
  const myUsername = useSelector(selectMyUsername)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text.trim() || room_id == null) return

    const message: DialogMessage = {
      message_id: Date.now(),
      text,
      created_at: Date.now().toString(),
      type: 'to',
    }

    dispatch(addDialogMessage(message))

    if (userIsInMessagesList) {
      dispatch(setLastUserMessage({ user_id, lastMessage: message }))
    } else {
      dispatch(
        addNewMessage({
          avatar,
          user_id,
          username,
          lastMessage: message,
        })
      )
    }

    socket.emit('sendMsg', {
      room_id,
      from_user: myUserId,
      to_user: user_id,
      text: message.text,
      userdata: {
        avatar: myAvatar,
        username: myUsername,
      },
    })

    messagesAPI.sendMessageToUser(room_id, text)

    setText('')
  }

  return {
    handleSubmit,
    handleInputChange,
    text,
  }
}
