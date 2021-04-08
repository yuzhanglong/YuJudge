/**
 * File: getValue.ts
 * Description: 字符串的形式获取value
 *
 * 例如:{a: aa, b:{c:d}}
 * 通过字符串 'b.c' 即可获取 d
 * Created: 2021-4-9 02:03:03
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export const getValue = (obj: any, str: string) => {
  const res = str.split('.')
  let tmp = obj
  for (let i = 0; i < res.length; i++) {
    tmp = tmp[res[i]]
    if (!tmp) {
      break
    }
  }
  return tmp
}
