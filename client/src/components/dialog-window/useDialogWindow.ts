import { useRef, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDialogData } from '../../redux/re-ducks/dialog/effects'
import {
  isDialogLoading,
  selectUserId,
  selectDialogData,
} from '../../redux/re-ducks/dialog/selectors'

export const useDialogWindow = () => {
  const dispatch = useDispatch()

  const isLoading = useSelector(isDialogLoading)
  const user_id = useSelector(selectUserId)
  const dialogData = useSelector(selectDialogData)

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

  return {
    user_id,
    isLoading,
    dialogData,
    msgBoxRef,
  }
}
