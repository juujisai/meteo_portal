import { SET_MAP_OBJECT } from '../actions/mapAction'

const initialState = {
  map: undefined
}

export const mapReducer = (state = initialState, action) => {
  if (action.type === SET_MAP_OBJECT) {
    // console.log(action.payload)
    return { ...state, map: action.payload }
  }
  return { ...state }
}

