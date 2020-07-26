import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../codeBlock/CodeBlock";
import {Col, Input, Row} from "antd";

interface MarkdownEditorProps {
  content?: string;
  minheight?: string;
  onChange?: (value: string) => void
}

const MarkdownEditor: React.FunctionComponent<MarkdownEditorProps> = (props) => {
  const [markdownValue, setMarkdownValue] = useState();

  const onMarkdownTextAreaChange = (event: any) => {
    event.persist();
    const value = event.target.value;
    setMarkdownValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  }

  return (
    <div className={"markdown-editor-wrap"}>
      <Row>
        <Col span={12}>
          <Input.TextArea
            autoSize={{
              minRows: 15,
              maxRows: 26
            }}
            onChange={onMarkdownTextAreaChange}
            value={props.content}/>
        </Col>
        <Col span={12}>
          <ReactMarkdown source={markdownValue}
                         className={"markdown-show"}
                         escapeHtml={false}
                         renderers={{code: CodeBlock}}>
          </ReactMarkdown>
        </Col>
      </Row>
    </div>
  )
}

export default MarkdownEditor;

