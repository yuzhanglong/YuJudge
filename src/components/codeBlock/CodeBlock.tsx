/*
 * File: Code
 * -9-10 01:13:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useState} from "react";
import classNames from "classnames";
import style from "./codeBlock.module.scss";
import CodeTool from "./childCmp/CodeTool";


interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FunctionComponent<CodeBlockProps> = (props) => {

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
      <code
        {...props}>
          {props.value}
      </code>
    </pre>
  )
}

export default CodeBlock;