import { DialogData, DialogMessage } from '../../../api/messages.api'
import {
  AddDialogMessage,
  FetchDialogDataStart,
  FetchDialogDataSuccess,
  SetDialogUserId,
  UpdateLastSeen,
} from '../types'

export enum DialogActionTypes {
  SET_DIALOG_USER_ID = 'dialog/SET_DIALOG_USER_ID',
  ADD_DIALOG_MESSAGE = 'dialog/ADD_DIALOG_MESSAGE',
  UPDATE_LAST_SEEN = 'dialog/UPDATE_LAST_SEEN',
  FETCH_DIALOG_START = 'dialog/FETCH_DIALOG_START',
  FETCH_DIALOG_SUCCESS = 'dialog/FETCH_DIALOG_SUCCESS',
}

export const setDialogUserId = (payload: number): SetDialogUserId => {
  return {
    type: DialogActionTypes.SET_DIALOG_USER_ID,
    payload,
  }
}

export const addDialogMessage = (payload: DialogMessage): AddDialogMessage => {
  return {
    type: DialogActionTypes.ADD_DIALOG_MESSAGE,
    payload,
  }
}

export const updateLastSeen = (): UpdateLastSeen => {
  return {
    type: DialogActionTypes.UPDATE_LAST_SEEN,
  }
}

export const fetchDialogDataStart = (): FetchDialogDataStart => {
  return {
    type: DialogActionTypes.FETCH_DIALOG_START,
  }
}

export const fetchDialogDataSuccess = (payload: DialogData): FetchDialogDataSuccess => {
  return {
    type: DialogActionTypes.FETCH_DIALOG_SUCCESS,
    payload,
  }
}
