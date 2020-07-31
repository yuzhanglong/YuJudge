import React from "react";
import {Table, Tag} from "antd";
import Column from "antd/lib/table/Column";
import {timestampToDateTime} from "../../../utils/DateTimeUtil";

interface SubmissionTableProps {
  submissions: any[];
  total: number;
}

const SubmissionTable: React.FunctionComponent<SubmissionTableProps> = (props) => {
  // 问题创建时间
  const renderCreateTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>)
  }

  // 渲染时间信息
  const renderTimeCost = (timeCost: number) => {
    return <div>{timeCost} ms</div>
  }

  // 渲染内存信息
  const renderMemoryCost = (memoryCost: number) => {
    return <div>{memoryCost} kb</div>
  }

  // 渲染判题结果标签
  const renderJudgeCondition = (condition: string) => {
    return (
      <div>
        <Tag color="#87d068" className={"judge-condition-tag-wrap"}>
          {condition}
        </Tag>
      </div>
    )
  }

  return (
    <Table dataSource={props.submissions}
           rowKey={"id"}
           size="small"
           pagination={
             {total: props.total, defaultPageSize: 15}
           }>
      <Column title={"提交时间"} align={"center"}
              dataIndex={"createTime"}
              key={"createTime"}
              width={150}
              render={renderCreateTime}/>
      <Column title={"状态"} align={"center"}
              dataIndex={"judgeCondition"}
              key={"judgeCondition"}
              width={150}
              render={renderJudgeCondition}/>
      <Column title={"编译器"} align={"center"}
              dataIndex={"language"}
              key={"language"}
              width={150}/>
      <Column title={"时间消耗"} align={"center"}
              dataIndex={"timeCost"}
              key={"timeCost"}
              render={renderTimeCost}
              width={150}/>
      <Column title={"内存消耗"} align={"center"}
              dataIndex={"memoryCost"}
              key={"memoryCost"}
              width={150}
              render={renderMemoryCost}/>
    </Table>
  )
}

export default SubmissionTable;