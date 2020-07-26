import React from "react";

interface CodeBlockProps {
  setRef?: string;
  language?: string;
  value?: string;
}

const CodeBlock: React.FunctionComponent<CodeBlockProps> = (props) => {
  return (
    <pre>
        <code ref={props.setRef} className={`language-${props.language}`}>
          {props.value}
        </code>
    </pre>
  )
}

export default CodeBlock;