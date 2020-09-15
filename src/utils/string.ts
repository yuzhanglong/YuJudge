/*
 * File: string.ts
 * Description: 字符串工具集合
 * Created: 2020-9-15 18:07:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// 截取 url 后缀
export const getUrlPostfix = (url: string) => {
  const index = url.lastIndexOf("/");
  return index ? url.substring(index + 1) : url;
}