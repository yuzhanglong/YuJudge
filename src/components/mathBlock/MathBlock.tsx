/*
 * File: MathBlock.tsx
 * Description: 适配React-Markdown的数学公式渲染组件
 * Created: 2020-9-10 13:38:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';
import MathFormula from '../mathFormula/MathFormula';

interface MathBlockProps {
  value: string;
}

const MathBlock: React.FunctionComponent<MathBlockProps> = (props) => {
  return (
    <span>
      <MathFormula math={props.value}/>
    </span>
  )
}

export default MathBlock;