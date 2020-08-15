import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../codeBlock/CodeBlock";
import {Col, Input, Row} from "antd";

interface MarkdownEditorProps {
  content?: string;
  minHeight?: string;
  onChange?: (value: string) => void
}

const MarkdownEditor: React.FunctionComponent<MarkdownEditorProps> = (props) => {
  const [markdownValue, setMarkdownValue] = useState();

  useEffect(() => {
    setMarkdownValue(props.content)
  }, [props.content])

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
            value={markdownValue}/>
        </Col>
        <Col span={12}>
          <ReactMarkdown
            source={markdownValue}
            className={"markdown-show"}
            escapeHtml={true}
            renderers={{
              code: CodeBlock
            }}>
          </ReactMarkdown>
        </Col>
      </Row>
    </div>
  )
}

export default MarkdownEditor;

