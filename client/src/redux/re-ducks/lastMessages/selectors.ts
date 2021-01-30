import { RootState } from '../../root-reducer'
import { LoadingState } from '../types'

export const selectLastMessages = (state: RootState) => state.lastMessages.messages
export const selectIsUserInMessagesList = (userId: number | null) => (state: RootState) =>
  userId != null ? state.lastMessages.messages.some((user) => user.user_id === userId) : null
export const selectAllUsersIds = (state: RootState) =>
  state.lastMessages.messages.map((msg) => msg.user_id) // TODO: мемоизировать
export const selectIsMessagesLoading = (state: RootState) => {
  if (
    state.lastMessages.status === LoadingState.LOADING ||
    state.lastMessages.status !== LoadingState.LOADED
  ) {
    return true
  } else return false
}
