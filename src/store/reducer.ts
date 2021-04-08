import { SET_LANGUAGE } from './constants'

export interface AppStore {
  language: 'zh-CN' | 'en-US'
}

const initialState: AppStore = {
  language: 'zh-CN'
}

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.language }
    default:
      return state
  }
}

export default reducer
