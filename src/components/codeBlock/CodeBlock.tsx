import React from "react";
import classNames from "classnames";

interface CodeBlockProps {
  setRef?: string;
  language?: string;
  value?: string;
}

const CodeBlock: React.FunctionComponent<CodeBlockProps> = (props) => {
  const classnames = classNames(`language-${props.language}`, "markdown-editor-code-content");
  return (
    <pre>
        <code ref={props.setRef} className={classnames}>
          {props.value}
        </code>
    </pre>
  )
}

export default CodeBlock;