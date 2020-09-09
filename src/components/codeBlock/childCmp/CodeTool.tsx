/*
 * File: CodeTool.tsx
 * Description: 代码小工具，例如复制功能
 * Created: 2020/9/10
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useState} from "react";
import {CopyOutlined} from "@ant-design/icons";
import CopyToClipboard from 'react-copy-to-clipboard';
import {Tooltip} from "antd";

interface CodeToolProps {
  code: string;
  classNames?: string;
}

const CodeTool: React.FunctionComponent<CodeToolProps> = (props) => {
  // 复制提示标签内容
  const [toolTipData, setToolTipData] = useState<string>("点击复制");

  // 复制成功
  const onCopySuccess = () => {
    setToolTipData("已复制");
    setTimeout(() => {
      setToolTipData("点击复制");
    }, 2000);
  }
  return (
    <div className={props.classNames}>
      <CopyToClipboard text={props.code} onCopy={() => onCopySuccess()}>
        <Tooltip placement="left" title={toolTipData}>
          <CopyOutlined/>
        </Tooltip>
      </CopyToClipboard>
    </div>
  )
}

export default CodeTool;