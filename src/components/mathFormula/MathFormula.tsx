/*
 * File: MathFormula.tsx
 * Description: 数学公式组件二次封装
 * Created: 2020-9-9 21:44:17
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';
import 'katex/dist/katex.min.css';
// @ts-ignore -- ps.没有声明文件
import {InlineMath, BlockMath} from 'react-katex';

interface MathFormulaProps {
  math: string;
  inline?: boolean;
}

const MathFormula: React.FunctionComponent<MathFormulaProps> = (props) => {

  // 组件参数
  const cmpProps = {
    errorColor: '#cc0000',
    renderError: (error: any) => {
      return <b>错误的公式: {error.name}</b>
    }
  }

  if (props.inline) {
    return (
      <InlineMath {...cmpProps}>{props.math}</InlineMath>
    )
  } else {
    return (
      <BlockMath {...cmpProps}>{props.math}</BlockMath>
    )
  }
}

MathFormula.defaultProps = {
  inline: true
}

export default MathFormula;