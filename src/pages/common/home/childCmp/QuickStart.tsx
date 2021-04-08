/*
 * File: QuickStart.tsx
 * Description: 首页快速开始组件，用来跳转到题目或者题目集
 * Created: 2020-8-26 13:01:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Input } from 'antd'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface QuickStartProps {
  onSearch: (value: string) => void;
}

const QuickStart: React.FunctionComponent<QuickStartProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)
  return (
    <div>
      <Input.Search
        enterButton={'GO!'}
        onSearch={(value) => props.onSearch(value)}
        placeholder={localContext.home.inputProblemNumber}
      />
    </div>
  )
}

export default QuickStart
