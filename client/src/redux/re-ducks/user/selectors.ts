import { RootState } from '../../root-reducer'

export const selectMyUserdata = (state: RootState) => state.user
export const selectMyAvatar = (state: RootState) => state.user?.avatar
export const selectMyId = (state: RootState) => state.user?.user_id
export const selectMyUsername = (state: RootState) => state.user?.username
