import { RootState } from '../../root-reducer'

export const selectAuthStatus = (state: RootState) => state.auth
