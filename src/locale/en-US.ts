/*
 * File: zh-CN.ts
 * Description: 中文语言模块
 * Created: 2021-4-8 00:14:38
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { Locale } from './types'

export const enUS: Locale = {
  localName: 'en-US',
  current: 'current',
  unlimited: 'unlimited',
  switch: 'switch',
  close: 'close',
  confirm: 'confirm',
  settingPage: {
    baseCard: 'System Settings',
    commonZoneTitle: 'Common',
    dangerZoneTitle: 'Danger Zone',
    setConcurrency: 'Set the number of simultaneous running judgment questions',
    setConcurrencyDesc: 'The number of judgment questions running at the same time can be modified according to the actual configuration',
    setGapTime: 'Set the submission interval',
    setLanguage: 'set language',
    submissionFrequencyText: 'The interval between two submissions by the user (seconds), which is used to prevent malicious calls and frequent submissions of the interface',
    checkCodeInfo: 'Turn on/off the verification code function'
  }
}
