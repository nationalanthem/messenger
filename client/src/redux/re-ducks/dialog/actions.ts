import { SetDialogUserId } from '../types'

export enum DialogActionTypes {
  SET_DIALOG_USER_ID = 'dialog/SET_DIALOG_USER_ID',
}

export const setDialogUserId = (payload: number): SetDialogUserId => {
  return {
    type: DialogActionTypes.SET_DIALOG_USER_ID,
    payload,
  }
}
