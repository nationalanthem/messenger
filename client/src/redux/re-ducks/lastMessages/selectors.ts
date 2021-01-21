import { RootState } from '../../root-reducer'

export const selectLastMessages = (state: RootState) => state.lastMessages
export const selectIsUserInMessagesList = (userId: number) => (state: RootState) =>
  state.lastMessages.some((user) => user.user_id === userId)
