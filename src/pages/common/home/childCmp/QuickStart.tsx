/*
 * File: QuickStart.tsx
 * Description: 首页快速开始组件，用来跳转到题目或者题目集
 * Created: 2020-8-26 13:01:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import Search from "antd/es/input/Search";

interface QuickStartProps {
  onSearch: (value: string) => void;
}

const QuickStart: React.FunctionComponent<QuickStartProps> = (props) => {

  return (
    <div>
      <Search
        enterButton={"GO!"}
        onSearch={(value) => props.onSearch(value)}
        placeholder="输入题目编号"
      />
    </div>
  )
}

export default QuickStart;