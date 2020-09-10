/*
 * File: BetterMarkdown.tsx
 * Description: Markdown展示组件，并使其支持数学公式
 * Created: 2020/9/9
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../codeBlock/CodeBlock";
import mathInline from "./mathInline";
import MathBlock from "../mathBlock/MathBlock";

interface BetterMarkdownProps {
  data?: string;
}

const BetterMarkdown: React.FunctionComponent<BetterMarkdownProps> = (props) => {
  return (
    <div>
      <ReactMarkdown
        source={props.data}
        renderers={{
          code: CodeBlock,
          inlineMath: MathBlock
        }}
        plugins={[mathInline]}/>
    </div>
  )
}

export default BetterMarkdown;