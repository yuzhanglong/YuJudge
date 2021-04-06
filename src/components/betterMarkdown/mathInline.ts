/*
 * File: mathInline.ts
 * Description: Markdown自定义语法
 * 约定: $$ xxx $$, xxx为TEX语法，可渲染数学公式
 *
 * Created: 2020-9-10 13:55:14
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import util from '../../utils/markdown';

// constants
const TAB = 9 // '\t'
const SPACE = 32 // ' '
const DOLLAR_SIGN = 36 // '$'
const DIGIT_ZERO = 48 // '0'
const DIGIT_NINE = 57 // '9'
const BACK_SLASH = 92 // '\\'
const NODE_NAME = 'inlineMath';


function mathInline(this: any) {
  const parser = this.Parser;

  if (util.isRemarkParser(parser)) {
    attachParser(parser)
  }
}

function attachParser(parser: any) {
  const proto = parser.prototype
  const inlineMethods = proto.inlineMethods

  mathInlineTokenizer.locator = locator

  proto.inlineTokenizers.math = mathInlineTokenizer

  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'math')

  function locator(value: string | string[], fromIndex: any) {
    return value.indexOf('$', fromIndex)
  }

  function mathInlineTokenizer(eat: any, value: any, silent: any) {
    const length = value.length
    let double = false;
    let escaped = false;
    let index = 0;
    let previous;
    let code;
    let next;
    let contentStart;
    let contentEnd;
    let valueEnd;
    let content;

    // 忽略 . 用 BACK_SLASH 表示
    if (value.charCodeAt(index) === BACK_SLASH) {
      escaped = true;
      index++;
    }

    if (value.charCodeAt(index) !== DOLLAR_SIGN) {
      return;
    }

    index++

    if (escaped) {
      if (silent) {
        return true;
      }

      return eat(value.slice(0, index))({type: 'text', value: '$'})
    }

    if (value.charCodeAt(index) === DOLLAR_SIGN) {
      double = true
      index++
    }

    next = value.charCodeAt(index)

    if (next === SPACE || next === TAB) {
      return;
    }

    contentStart = index

    while (index < length) {
      code = next
      next = value.charCodeAt(index + 1)

      if (code === DOLLAR_SIGN) {
        previous = value.charCodeAt(index - 1)
        // 封闭区域不能以 SPACE 或 TAB 开头，也不能以数字开头。
        if (previous !== SPACE && previous !== TAB && (next < DIGIT_ZERO || next > DIGIT_NINE) && (!double || next === DOLLAR_SIGN)) {
          contentEnd = index - 1;
          index++;
          if (double) {
            index++
          }
          valueEnd = index;
          break;
        }
      } else if (code === BACK_SLASH) {
        index++;
        next = value.charCodeAt(index + 1)
      }
      index++;
    }

    if (valueEnd === undefined) {
      return;
    }

    if (silent) {
      return true;
    }

    content = value.slice(contentStart, (contentEnd || 0) + 1)

    return eat(value.slice(0, valueEnd))({
      type: NODE_NAME,
      value: content,
      data: {
        hName: 'span',
        hProperties: {},
        hChildren: [
          {
            type: 'text',
            value: content
          }
        ]
      }
    })
  }
}


export default mathInline;