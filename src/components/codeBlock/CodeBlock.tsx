/*
 * File: Code
 * -9-10 01:13:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import classNames from "classnames";
import style from "./codeBlock.module.scss";
import CodeTool from "./childCmp/CodeTool";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
// @ts-ignore
import {cpp, c, java, python} from "react-syntax-highlighter/dist/esm/languages/prism";

import {coy} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FunctionComponent<CodeBlockProps> = (props) => {

  useEffect(() => {
    SyntaxHighlighter.registerLanguage("c", c);
    SyntaxHighlighter.registerLanguage("cpp", cpp);
    SyntaxHighlighter.registerLanguage("java", java);
    SyntaxHighlighter.registerLanguage("python", python);
  }, []);

  // 样式类
  const codeClassNames = classNames(style.code_block, {
    [style.code_block_language_in]: props.language === "in",
    [style.code_block_language_out]: props.language === "out",
  });

  // 代码区鼠标悬停与否
  const [isCodeHover, setIsCodeHover] = useState<boolean>(false);


  return (
    <pre className={codeClassNames} onMouseOver={() => setIsCodeHover(true)}
         onMouseLeave={() => setIsCodeHover(false)}>
      <div className={style.code_block_tools_wrap}>
        {isCodeHover && <CodeTool code={props.value} classNames={style.code_block_tools}/>}
      </div>
      <SyntaxHighlighter language={props.language} style={coy} customStyle={{
        backgroundColor: "transparent"
      }}>
          {props.value}
      </SyntaxHighlighter>
    </pre>
  )
}

export default CodeBlock;