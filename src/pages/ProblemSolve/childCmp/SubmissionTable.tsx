import React from "react";
import {Table, Tag} from "antd";
import Column from "antd/lib/table/Column";
import {timestampToDateTime} from "../../../utils/DateTimeUtil";
import {JudgeConditionEnum} from "../../../core/enumerations/JudgeConditionEnum";
import {SyncOutlined} from '@ant-design/icons';
import {TablePaginationConfig} from "antd/lib/table/interface";

interface SubmissionTableProps {
  submissions: any[];
  total: number;
  activePage: number;
  onPageChange?: (currentPage: number) => void;
}

const SubmissionTable: React.FunctionComponent<SubmissionTableProps> = (props) => {
  // 问题创建时间
  const renderCreateTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>)
  }

  // 渲染时间信息
  const renderTimeCost = (timeCost: number) => {
    return <div>{timeCost ? timeCost : "--"} ms</div>
  }

  // 渲染内存信息
  const renderMemoryCost = (memoryCost: number) => {
    return <div>{memoryCost ? memoryCost : "--"} kb</div>
  }

  // 获取判题结果标签颜色
  const getJudgeConditionColor = (condition: string) => {
    switch (condition) {
      case JudgeConditionEnum.ACCEPT:
        return "#52c41a";
      case JudgeConditionEnum.COMPILE_ERROR:
        return "#9254de";
      case JudgeConditionEnum.WRONG_ANSWER:
        return "#ff4d4f";
      case JudgeConditionEnum.MEMORY_LIMIT_EXCEED:
        return "#2f54eb";
      case JudgeConditionEnum.TIME_LIMIT_EXCEEDED:
        return "#d4b106";
      case JudgeConditionEnum.PENDING:
        return "#8c8c8c";
      case JudgeConditionEnum.WAITING:
        return "#8c8c8c";
    }
  }

  // 获取判题结果标签名称
  const getJudgeConditionTagName = (condition: string) => {
    switch (condition) {
      case JudgeConditionEnum.ACCEPT:
        return "ACCEPT";
      case JudgeConditionEnum.COMPILE_ERROR:
        return "COMPILE ERROR";
      case JudgeConditionEnum.WRONG_ANSWER:
        return "WRONG ANSWER";
      case JudgeConditionEnum.PENDING:
        return "PENDING";
      case JudgeConditionEnum.MEMORY_LIMIT_EXCEED:
        return "MEMORY LIMIT EXCEED";
      case JudgeConditionEnum.TIME_LIMIT_EXCEEDED:
        return "TIME LIMIT EXCEEDED";
      case JudgeConditionEnum.WAITING:
        return "WAITING";
    }
  }


  // 渲染判题结果标签
  const renderJudgeCondition = (condition: string) => {
    return (
      <div>
        <Tag color={getJudgeConditionColor(condition)}
             icon={condition === JudgeConditionEnum.PENDING ? (<SyncOutlined spin/>) : null}
             className={"judge-condition-tag-wrap"}>
          {getJudgeConditionTagName(condition)}
        </Tag>
      </div>
    )
  }

  // 当用户刷新页码时
  const refreshPagination = (event: TablePaginationConfig) => {
    if (props.onPageChange) {
      props.onPageChange(event.current ? event.current : 1);
    }
  }

  return (
    <Table dataSource={props.submissions}
           rowKey={"id"}
           size="small"
           pagination={
             {total: props.total, defaultPageSize: 15, current: props.activePage}
           } onChange={refreshPagination}>
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