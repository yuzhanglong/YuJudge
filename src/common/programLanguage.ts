/*
 * File: programLanguage.ts
 * Description: 编程语言相关配置内容
 * Created: 2020-8-2 10:28
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {LanguageTypeEnum} from "./enumerations";

// C_PLUS_PULS的昵称
export const C_PLUS_PLUS_NICK_NAME = "C++";

// 展示给用户，支持的编程语言的执行脚本内容
export const PROGRAM_LANGUAGE_SCRIPT_CONTENT: { [key: string]: string; } = {
  [LanguageTypeEnum.C]: "gcc -Wall -O2 -std=gnu11 CODE_PATH -o CODE_PATH -lm",
  [LanguageTypeEnum.C_PLUS_PLUS]: "g++ -Wall -O2 CODE_PATH -o CODE_PATH",
  [LanguageTypeEnum.JAVA]: "java Main",
  [LanguageTypeEnum.PYTHON]: "python3 CODE_PATH",
}

// 展示给用户，编程语言的名称
export const PROGRAM_LANGUAGE_NAME: { [key: string]: string; } = {
  [LanguageTypeEnum.C]: "C",
  [LanguageTypeEnum.C_PLUS_PLUS]: C_PLUS_PLUS_NICK_NAME,
  [LanguageTypeEnum.JAVA]: "JAVA",
  [LanguageTypeEnum.PYTHON]: "PYTHON",
}

