import { FilterActions, FilterState } from '../types'
import { FilterActionTypes } from './actions'

const initialState = null

const filterReducer = (state: FilterState = initialState, action: FilterActions) => {
  switch (action.type) {
    case FilterActionTypes.SET_FILTER:
      return action.payload
    case FilterActionTypes.CLEAR_FILTER:
      return null
    default:
      return state
  }
}

export default filterReducer
