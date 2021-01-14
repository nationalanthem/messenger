import { RootState } from '../../root-reducer'

export const selectUser = (state: RootState) => state.user
export const selectAvatar = (state: RootState) => state.user?.avatar
