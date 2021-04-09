/*
 * File: action.ts
 * Description: action
 * Created: 2021-4-7 00:28:39
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { SET_LANGUAGE } from './constants'

export const languageChangeAction = (language: string) => {
  window.localStorage.setItem('LANGUAGE', language)
  return {
    type: SET_LANGUAGE,
    language: language
  }
}
