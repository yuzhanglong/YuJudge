/*
 * File: markdown.ts
 * Description: markdown自定义渲染的工具类
 * Created: 2020-9-10 13:46:44
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

const isRemarkParser = (parser: any) => {
  return Boolean(parser && parser.prototype && parser.prototype.blockTokenizers)
}

const isRemarkCompiler = (compiler: any) => {
  return Boolean(compiler && compiler.prototype && compiler.prototype.visitors)
}

export default {
  isRemarkCompiler,
  isRemarkParser
};