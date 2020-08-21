/*
 * File: regex.ts
 * Description: 正则表达式处理
 * Created: 2020-8-18 15:38:27
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 获取ip
export const getIpAddress = (raw: string) => {
  const pattern = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
  const res = pattern.exec(raw);
  return res && res.length > 0 ? res[0] : null;
}

// 判断是否ip地址
export const isIpAddress = (strToCheck: string) => {
  let reg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
  if (reg.test(strToCheck)) {
    return parseInt(RegExp.$1) < 256 &&
      parseInt(RegExp.$2) < 256 &&
      parseInt(RegExp.$3) < 256 &&
      parseInt(RegExp.$4) < 256;
  } else {
    return false;
  }
}