import { RootState } from '../../root-reducer'
import { LoadingState } from '../types'

export const selectUserId = (state: RootState) => state.dialog.current_user_id
export const selectDialogData = (state: RootState) => state.dialog.data
export const isDialogLoading = (state: RootState) => {
  if (state.dialog.status === LoadingState.LOADING || state.dialog.status !== LoadingState.LOADED) {
    return true
  } else return false
}
