import { RootState } from '../../root-reducer'
import { LoadingState } from '../types'

export const selectLastMessages = (state: RootState) => state.lastMessages.messages
export const selectIsUserInMessagesList = (userId: number) => (state: RootState) =>
  state.lastMessages.messages.some((user) => user.user_id === userId)

export const selectIsMessagesLoading = (state: RootState) => {
  if (
    state.lastMessages.status === LoadingState.LOADING ||
    state.lastMessages.status !== LoadingState.LOADED
  ) {
    return true
  } else return false
}
