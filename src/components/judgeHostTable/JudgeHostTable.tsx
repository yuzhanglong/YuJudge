/*
 * File: JudgeHostTable.tsx
 * Description: 判题服务器的相关表格
 * Created: 2020-08-17 11:41:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {JudgeHostCondition, JudgeHostInfo} from "../../models/judgeHost";
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
      <Tag color={isActive ? "green" : "red"}>
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

  // 渲染cpu消耗百分比
  const renderCpuCostPercentage = (value: JudgeHostCondition) => {
    return (
      <div>
        {value.cpuCostPercentage !== null ? value.cpuCostPercentage + "%" : "---"}
      </div>
    )
  }

  // 渲染cpu消耗百分比
  const renderMemoryCostPercentage = (value: JudgeHostCondition) => {
    return (
      <div>
        {value.memoryCostPercentage !== null ? value.memoryCostPercentage + "%" : "---"}
      </div>
    )
  }

  // 渲染当前判题个数数量
  const renderWorkingAmount = (value: JudgeHostCondition) => {
    return (
      <div>{value.workingAmount !== null ? value.workingAmount : "---"}</div>
    )
  }

  // 渲染cpu核心数
  const renderCpuCoreAmount = (value: JudgeHostCondition) => {
    return (
      <div>{value.cpuCoreAmount !== null ? value.cpuCoreAmount : "---"}</div>
    )
  }

  return (
    <Table dataSource={props.judgeHosts}>
      <Column
        title={"状态"}
        dataIndex={"active"}
        key={"active"}
        render={renderCondition}
        width={100}/>
      <Column
        title={"名称"}
        dataIndex={"name"}
        align={"center"}
        key={"name"} width={250}/>
      <Column
        title={"cpu核心数"}
        dataIndex={"condition"}
        key={"cpu-core"}
        align={"center"}
        render={renderCpuCoreAmount}/>
      <Column
        title={"当前判题个数"}
        align={"center"}
        dataIndex={"condition"}
        key={"currentWorking"}
        render={renderWorkingAmount}/>
      <Column
        title={"cpu消耗"}
        align={"center"}
        dataIndex={"condition"}
        key={"cpu"} render={renderCpuCostPercentage}/>
      <Column
        align={"center"}
        title={"内存消耗"}
        dataIndex={"condition"}
        key={"memory"} render={renderMemoryCostPercentage}/>
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