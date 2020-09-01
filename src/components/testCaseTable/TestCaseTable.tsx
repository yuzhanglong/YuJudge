/*
 * File: TestCaseTable.tsx
 * Description: 判题测试点的展示表格
 * Created: 2020-8-21 14:45:42
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button, Table} from "antd";
import {ProblemTestCase} from "../../models/problem";
import {DownloadOutlined} from "@ant-design/icons";

interface TestCaseTableProps {
  testCases: ProblemTestCase[];
  operations?: (content: any) => React.ReactNode;
  showDownLoadUrlColumn?: boolean;
}

const TestCaseTable: React.FunctionComponent<TestCaseTableProps> = (props) => {

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
        {url}
        <Button
          icon={<DownloadOutlined/>}
          style={{
            marginLeft: 15
          }} size={"small"}
          onClick={() => onEditButtonClick(url)}/>

      </div>
    )
  }

  // 测试点下载按钮被按下
  const onEditButtonClick = (url: string) => {
    window.open(url);
  }

  return (
    <Table
      pagination={false}
      dataSource={props.testCases}
      rowKey={"id"}>
      <Table.Column
        title={"编号"}
        render={((value, record, index) => (index + 1))}
      />
      <Table.Column
        title={"描述"}
        dataIndex={"description"}
      />
      {props.showDownLoadUrlColumn &&
      <Table.Column
        title={"标准输入"}
        dataIndex={"stdIn"}
        render={renderTestCaseDownLoad}
      />}
      {props.showDownLoadUrlColumn &&
      <Table.Column
        title={"标准输出"}
        dataIndex={"expectedStdOut"}
        render={renderTestCaseDownLoad}
      />}
      <Table.Column
        title={"操作"}
        key={"number"}
        width={150}
        render={renderOperations}
        align={"center"}/>
      />
    </Table>
  )
}
TestCaseTable.defaultProps = {
  showDownLoadUrlColumn: false
}

export default TestCaseTable;