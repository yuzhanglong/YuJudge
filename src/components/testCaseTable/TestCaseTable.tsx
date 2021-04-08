/*
 * File: TestCaseTable.tsx
 * Description: 判题测试点的展示表格
 * Created: 2020-8-21 14:45:42
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Button, Table } from 'antd'
import { ProblemTestCase } from '../../models/problem'
import { DownloadOutlined } from '@ant-design/icons'
import { getUrlPostfix } from '../../utils/string'
import { LocalContext } from '../localContext/LocalContext'

interface TestCaseTableProps {
  testCases: ProblemTestCase[];
  operations?: (content: any) => React.ReactNode;
  showDownLoadUrlColumn?: boolean;
}

const TestCaseTable: React.FunctionComponent<TestCaseTableProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  // 渲染操作相关
  const renderOperations = (content: any) => {
    return (
      <div>
        {props.operations ? props.operations(content) : null}
      </div>
    )
  }

  // 渲染测试点以及其右侧的下载按钮
  const renderTestCaseDownLoad = (url: string) => {
    return (
      <div>
        {getUrlPostfix(url)}
        <Button
          icon={<DownloadOutlined />}
          style={{
            marginLeft: 15
          }} size={'small'}
          onClick={() => onEditButtonClick(url)} />

      </div>
    )
  }

  // 测试点下载按钮被按下
  const onEditButtonClick = (url: string) => {
    window.open(url)
  }

  return (
    <Table
      pagination={false}
      dataSource={props.testCases}
      rowKey={'id'}>
      <Table.Column
        title={localContext.testCase.id}
        render={((value, record, index) => (index + 1))}
      />
      <Table.Column
        title={localContext.testCase.desc}
        dataIndex={'description'}
      />
      {props.showDownLoadUrlColumn &&
      <Table.Column
        title={localContext.testCase.basicStdIn}
        dataIndex={'stdIn'}
        render={renderTestCaseDownLoad}
      />}
      {props.showDownLoadUrlColumn &&
      <Table.Column
        title={localContext.testCase.stdOut}
        dataIndex={'expectedStdOut'}
        render={renderTestCaseDownLoad}
      />}
      <Table.Column
        title={localContext.operation}
        key={'number'}
        width={150}
        render={renderOperations}
        align={'center'} />
      />
    </Table>
  )
}
TestCaseTable.defaultProps = {
  showDownLoadUrlColumn: false
}

export default TestCaseTable
