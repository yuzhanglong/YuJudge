/*
 * File: BetterMarkdown.tsx
 * Description: Markdown展示组件，并使其支持数学公式
 * Created: 2020/9/9
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import ReactMarkdown from "react-markdown";
import MathFormula from "../mathFormula/MathFormula";

interface BetterMarkdownProps {
  data?: string;

}

const BetterMarkdown: React.FunctionComponent<BetterMarkdownProps> = (props) => {
  // 根据我们约定的公式匹配符号 例如 $$ x^2 dx $$ 进行分割

  useEffect(() => {
    renderData();
  }, []);

  // data为 Markdown 和 Tex的混合数据，需要进行一定的处理
  const renderData = () => {
    let pattern = /\$\$.*?\$\$/g;
    const maths: string[] = props.data?.match(pattern) || [];
    const arr = props.data?.split(pattern) || [];
    console.log(arr);
    console.log(maths);
    let components = [];
    const len = arr.length;
    if (len > 0) {
      let keyIndex = 0;
      for (let i = 0; i < len - 1; i++) {
        components.push(<ReactMarkdown source={arr[i]} key={keyIndex++}/>);
        if (maths && maths.length) {
          components.push(<MathFormula math={maths[i].slice(2, -2)} key={keyIndex++}/>);
        }
      }
      components.push(<ReactMarkdown source={arr[len - 1]} key={keyIndex++}/>);
    }
    return components;
  }
  return (
    <div>
      {renderData()}
    </div>
  )
}

export default BetterMarkdown;