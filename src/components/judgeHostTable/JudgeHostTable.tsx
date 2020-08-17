/*
 * File: JudgeHostTable.tsx
 * Description: 判题服务器的相关表格
 * Created: 2020-08-17 11:41:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {JudgeHostInfo} from "../../models/judgeHost";
import {Table, Tag} from "antd";
import Column from "antd/lib/table/Column";

interface JudgeHostTable {
  judgeHosts: JudgeHostInfo[];
  operations?: (value: any) => React.ReactNode;
}

const JudgeHostTable: React.FunctionComponent<JudgeHostTable> = (props) => {

  // 渲染状态
  const renderCondition = (isActive: boolean) => {
    return (
      <Tag color="green">
        {isActive ? "运行中" : "已停止"}
      </Tag>
    )
  }

  // 渲染操作
  const renderOperations = (value: any) => {
    return (
      <div>
        {props.operations ? props.operations(value) : null}
      </div>
    )
  }

  return (
    <Table dataSource={props.judgeHosts}>
      <Column
        title={"状态"}
        dataIndex={"active"}
        key={"active"}
        render={renderCondition}
        width={250}/>
      <Column
        title={"名称"}
        dataIndex={"name"}
        key={"name"}/>
      <Column
        title={"cpu消耗"}
        dataIndex={"cpu"}
        key={"put"}/>
      <Column
        title={"内存消耗"}
        dataIndex={"memory"}
        key={"memory"}/>
      {
        props.operations &&
        <Column
          align={"center"}
          title={"操作"}
          key={"operation"}
          render={renderOperations}/>
      }
    </Table>
  )
}

export default JudgeHostTable;