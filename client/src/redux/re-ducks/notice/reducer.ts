import { NoticeActions, NoticeState } from '../types'
import { NoticeActionTypes } from './actions'

const noticeReducer = (initialState: NoticeState = null, action: NoticeActions) => {
  switch (action.type) {
    case NoticeActionTypes.SET_NOTICE:
      return action.payload
    case NoticeActionTypes.CLEAR_NOTICE:
      return null
    default:
      return initialState
  }
}

export default noticeReducer
