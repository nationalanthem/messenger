import { ClearFilter, SearchFilter, SetFilter } from '../types'

export enum FilterActionTypes {
  SET_FILTER = 'filter/SET_FILTER',
  CLEAR_FILTER = 'filter/CLEAR_FILTER',
}

export const setFilter = (payload: SearchFilter): SetFilter => {
  return {
    type: FilterActionTypes.SET_FILTER,
    payload,
  }
}

export const clearFilter = (): ClearFilter => {
  return {
    type: FilterActionTypes.CLEAR_FILTER,
  }
}
