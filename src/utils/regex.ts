/*
 * File: regex.ts
 * Description: 正则表达式处理
 * Created: 2020-8-18 15:38:27
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export const getIpAddress = (raw: string) => {
  const pattern = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
  const res = pattern.exec(raw);
  return res && res.length > 0 ? res[0] : null;
}