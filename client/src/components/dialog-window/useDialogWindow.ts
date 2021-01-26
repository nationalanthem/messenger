import { useRef, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDialogData } from '../../redux/re-ducks/dialog/effects'
import {
  isDialogLoading,
  selectUserId,
  selectDialogData,
} from '../../redux/re-ducks/dialog/selectors'
import { addNewMessage } from '../../redux/re-ducks/lastMessages/actions'
import { selectIsUserInMessagesList } from '../../redux/re-ducks/lastMessages/selectors'

export const useDialogWindow = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector(isDialogLoading)
  const user_id = useSelector(selectUserId)
  const dialogData = useSelector(selectDialogData)
  const userIsInMessagesList = useSelector(selectIsUserInMessagesList(user_id))

  const msgBoxRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (dialogData && msgBoxRef.current) {
      msgBoxRef.current.scrollTo({ top: msgBoxRef.current.scrollHeight })
    }
  }, [dialogData])

  useEffect(() => {
    if (user_id != null) {
      dispatch(fetchDialogData(user_id))
    }
  }, [user_id, dispatch])

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
