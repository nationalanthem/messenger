import { useRef, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDialogData } from '../../redux/re-ducks/dialog/effects'
import {
  isDialogLoading,
  selectUserId,
  selectDialogData,
  selectRoomId,
} from '../../redux/re-ducks/dialog/selectors'
import { addNewMessage, setLastUserMessage } from '../../redux/re-ducks/lastMessages/actions'
import { selectIsUserInMessagesList } from '../../redux/re-ducks/lastMessages/selectors'
import { addDialogMessage, updateLastSeen } from '../../redux/re-ducks/dialog/actions'
import { SendMsgPayload, socket } from '../../socket'
import { DialogMessage } from '../../api/messages.api'
import { LastMessageFromDialog } from '../../redux/re-ducks/types'

export const useDialogWindow = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector(isDialogLoading)
  const user_id = useSelector(selectUserId)
  const dialogData = useSelector(selectDialogData)
  const userIsInMessagesList = useSelector(selectIsUserInMessagesList(user_id))
  const chatroomId = useSelector(selectRoomId)

  const msgBoxRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (dialogData && msgBoxRef.current) {
      msgBoxRef.current.scrollTo({ top: msgBoxRef.current.scrollHeight })
    }
  }, [dialogData])

  useEffect(() => {
    const dispatchDialogMessage = (payload: SendMsgPayload) => {
      const { room_id, text, from_user, to_user, type } = payload

      if (room_id === chatroomId) {
        const message_id = Date.now()
        const created_at = Date.now().toString()

        const dialogMessage: DialogMessage = {
          message_id,
          text,
          created_at,
          type,
        }

        const lastMessage: LastMessageFromDialog = {
          lastMessage: {
            created_at,
            message_id,
            text,
          },
          user_id: type === 'to' ? to_user : from_user,
        }

        dispatch(addDialogMessage(dialogMessage))
        dispatch(setLastUserMessage(lastMessage))
        dispatch(updateLastSeen())
      }
    }

    socket.on('sendMsg', (payload: SendMsgPayload) => {
      dispatchDialogMessage(payload)
    })

    return () => {
      socket.off('sendMsg')
    }
  }, [chatroomId, dispatch])

  useEffect(() => {
    if (user_id != null) {
      dispatch(fetchDialogData(user_id))
    }
  }, [user_id, dispatch])

  useEffect(() => {
    if (chatroomId != null) {
      socket.emit('joinChatroom', chatroomId)
    }

    return () => {
      socket.emit('exitChatroom')
    }
  }, [chatroomId])

  useEffect(() => {
    if (dialogData && dialogData.user_id === user_id && !userIsInMessagesList) {
      dispatch(
        addNewMessage({
          user_id,
          username: dialogData.username,
          avatar: dialogData.avatar,
          lastMessage: dialogData.messages.length
            ? dialogData.messages[dialogData.messages.length - 1]
            : null,
        })
      )
    }
  }, [dialogData, user_id, userIsInMessagesList, dispatch])

  return {
    user_id,
    isLoading,
    dialogData,
    msgBoxRef,
  }
}
