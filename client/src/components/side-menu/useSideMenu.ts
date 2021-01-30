import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../../api/types'
import { selectUserId } from '../../redux/re-ducks/dialog/selectors'
import { selectFilter } from '../../redux/re-ducks/filter/selectors'
import { addNewMessage, setLastUserMessage } from '../../redux/re-ducks/lastMessages/actions'
import {
  selectLastMessages,
  selectIsMessagesLoading,
  selectAllUsersIds,
} from '../../redux/re-ducks/lastMessages/selectors'
import { selectMyId, selectMyUsername } from '../../redux/re-ducks/user/selectors'
import { socket, UpdLastMessage } from '../../socket'

const useSideMenu = () => {
  const dispatch = useDispatch()

  const messages = useSelector(selectLastMessages)
  const current_user_id = useSelector(selectUserId)
  const myUsername = useSelector(selectMyUsername)
  const filter = useSelector(selectFilter)
  const isMessagesLoading = useSelector(selectIsMessagesLoading)
  const myUserId = useSelector(selectMyId)
  const allUsersIds = useSelector(selectAllUsersIds)

  useEffect(() => {
    const dispatchSetLastUserMessage = (user_id: number, text: string) => {
      dispatch(
        setLastUserMessage({
          user_id,
          lastMessage: {
            created_at: Date.now().toString(),
            message_id: Date.now(),
            text,
          },
        })
      )
    }

    const dispatchAddNewMessage = (
      avatar: string | null,
      username: string,
      user_id: number,
      lastMessage: Message
    ) => {
      dispatch(
        addNewMessage({
          avatar,
          username,
          user_id,
          lastMessage,
        })
      )
    }

    socket.on('updLastMessage', (payload: UpdLastMessage) => {
      const { from_user, text, avatar, username } = payload
      if (allUsersIds.indexOf(from_user) !== -1) {
        dispatchSetLastUserMessage(from_user, text)
      } else {
        dispatchAddNewMessage(avatar, username, from_user, {
          created_at: Date.now().toString(),
          message_id: Date.now(),
          text,
        })
      }
    })

    return () => {
      socket.off('updLastMessage')
    }
  }, [myUserId, allUsersIds, dispatch])

  return { filter, current_user_id, messages, dispatch, isMessagesLoading, myUsername }
}

export default useSideMenu
