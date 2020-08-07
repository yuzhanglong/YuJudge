/*
 * File: dateTime.ts
 * Description: 时间处理工具
 * Created: 2020/7/21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export function timestampToDateTime(timestamp: number): string {
  let time = new Date(timestamp);
  return time.toLocaleString();
}