import { SET_LANGUAGE } from './constants'
import { AnyAction } from 'redux'

export interface AppStore {
  language: 'zh-CN' | 'en-US'
}

const initialState: AppStore = {
  language: 'zh-CN'
}

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.language }
    default:
      return state
  }
}

export default reducer
