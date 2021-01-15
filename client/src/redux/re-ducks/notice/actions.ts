import { Notice, SetNotice, ClearNotice } from '../types'

export enum NoticeActionTypes {
  SET_NOTICE = 'notice/SET_NOTICE',
  CLEAR_NOTICE = 'notice/CLEAR_NOTICE',
}

export const setNotice = (payload: Notice): SetNotice => {
  return {
    type: NoticeActionTypes.SET_NOTICE,
    payload,
  }
}

export const clearNotice = (): ClearNotice => {
  return {
    type: NoticeActionTypes.CLEAR_NOTICE,
  }
}
