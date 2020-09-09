/*
 * File: mathFormula.ts
 * Description: 计算相关工具函数
 * Created: 2020-08-11 19:42:03
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 十进制转二十六进制 例如, 1 - A  2 - B
export const tenDecimalToTwentySixDecimal = (number: number) => {
  const MOD_BASE = 26;
  const ASCII_A = 65;
  let end = number;
  let res: string = "";
  do {
    let modRes = end % MOD_BASE;
    if (modRes === 0) modRes = 26;
    res = String.fromCharCode(modRes + ASCII_A - 1) + res;
    end = (end - modRes) / MOD_BASE;
  } while (end > 0);
  return res;
}