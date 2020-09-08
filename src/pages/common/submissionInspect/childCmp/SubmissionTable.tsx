/*
 * File: SubmissionTable.tsx
 * Description: 提交表格
 * Created: 2020-9-1 13:43:39
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Table} from "antd";

import {timestampToDateTime} from "../../../../utils/dateTime";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {JudgeConditionEnum} from "../../../../common/enumerations";
import {PROGRAM_LANGUAGE_NAME} from "../../../../common/programLanguage";
import {SUBMISSION_SINGLE_PAGE_SIZE} from "../../../../config/config";
import {Submission} from "../../../../models/submission";
import ConditionTag from "../../../../components/conditionTag/ConditionTag";
import {UserInfo} from "../../../../models/user";


interface SubmissionTableProps {
  isLoading?: boolean;
  submissions: Submission[];
  total: number;
  activePage: number;
  onPageChange?: (currentPage: number) => void;
  onSubmissionTagClick?: (detail: any) => void;
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


  // 渲染用户
  const renderCreator = (creator: UserInfo) => {
    return <div>{creator.nickname}</div>
  }


  // 当用户刷新页码时
  const refreshPagination = (event: TablePaginationConfig) => {
    if (props.onPageChange) {
      props.onPageChange(event.current ? event.current : 1);
    }
  }


  // 展示编译器内容
  const renderCompilerContent = (content: string) => {
    return (<div>{PROGRAM_LANGUAGE_NAME[content]}</div>);
  }

  // 渲染判题结果标签
  const renderJudgeCondition = (condition: JudgeConditionEnum, detail: any) => {
    return <ConditionTag
      condition={condition}
      detail={detail}
      onSubmissionTagClick={
        data => {
          props.onSubmissionTagClick && props.onSubmissionTagClick(data)
        }
      }/>
  }

  return (
    <Table
      loading={props.isLoading}
      dataSource={props.submissions}
      rowKey={"id"}
      size="middle"
      pagination={{
        total: props.total,
        defaultPageSize: SUBMISSION_SINGLE_PAGE_SIZE,
        current: props.activePage,
        showSizeChanger: false
      }}
      onChange={refreshPagination}>
      <Table.Column
        title={"提交时间"} align={"center"}
        dataIndex={"createTime"}
        key={"createTime"}
        width={150}
        render={renderCreateTime}/>
      <Table.Column
        title={"状态"} align={"center"}
        dataIndex={"judgeCondition"}
        key={"judgeCondition"}
        width={150}
        render={renderJudgeCondition}/>
      <Table.Column
        title={"编译器"} align={"center"}
        dataIndex={"language"}
        key={"language"}
        width={150}
        render={renderCompilerContent}/>
      <Table.Column
        title={"时间消耗"} align={"center"}
        dataIndex={"timeCost"}
        key={"timeCost"}
        render={renderTimeCost}
        width={150}/>
      <Table.Column
        title={"内存消耗"} align={"center"}
        dataIndex={"memoryCost"}
        key={"memoryCost"}
        width={150}
        render={renderMemoryCost}/>
      <Table.Column
        title={"提交用户"} align={"center"}
        dataIndex={"creator"}
        key={"creator"}
        width={150}
        render={renderCreator}/>
    </Table>
  )
}

SubmissionTable.defaultProps = {
  isLoading: false
}

export default SubmissionTable;