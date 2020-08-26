import React from "react";
import {Table, Tag} from "antd";
import Column from "antd/lib/table/Column";
import {timestampToDateTime} from "../../../../utils/dateTime";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {JudgeConditionEnum} from "../../../../common/enumerations";
import {JUDGE_CONDITION_COLORS, JUDGE_CONDITION_TAG_NAMES} from "../../../../common/judgeCondition";
import {PROGRAM_LANGUAGE_NAME} from "../../../../common/programLanguage";
import {SUBMISSION_SINGLE_PAGE_SIZE} from "../../../../config/config";
import classNames from "classnames";
import {SubmissionInfo} from "../../../../models/submissionInfo";
import {UserInfo} from "../../../../models/user";

interface SubmissionTableProps {
  submissions: SubmissionInfo[];
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

  // 获取判题结果标签颜色
  const getJudgeConditionColor = (condition: JudgeConditionEnum) => {
    return JUDGE_CONDITION_COLORS[condition];
  }

  // 获取判题结果标签名称
  const getJudgeConditionTagName = (condition: JudgeConditionEnum) => {
    return JUDGE_CONDITION_TAG_NAMES[condition];
  }

  const renderCreator = (creator: UserInfo) => {
    return <div>{creator.nickname}</div>
  }


  // 渲染判题结果标签
  const renderJudgeCondition = (condition: JudgeConditionEnum, detail: any) => {
    const isLoading = (condition === JudgeConditionEnum.WAITING || condition === JudgeConditionEnum.PENDING)
    const className = classNames("judge-condition-tag-wrap", {
      "judge-condition-tag-wrap-loading": isLoading
    })
    return (
      <div>
        <Tag color={getJudgeConditionColor(condition)}
             onClick={() => onSeeSubmissionTagClick(detail)}
             className={className}>
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

  // 判题状态标签被单击
  const onSeeSubmissionTagClick = (detail: any) => {
    if (props.onSubmissionTagClick) {
      props.onSubmissionTagClick(detail);
    }
  }

  // 展示编译器内容
  const renderCompilerContent = (content: string) => {
    return (<div>{PROGRAM_LANGUAGE_NAME[content]}</div>);
  }

  return (
    <Table
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
      <Column
        title={"提交时间"} align={"center"}
        dataIndex={"createTime"}
        key={"createTime"}
        width={150}
        render={renderCreateTime}/>
      <Column
        title={"状态"} align={"center"}
        dataIndex={"judgeCondition"}
        key={"judgeCondition"}
        width={150}
        render={renderJudgeCondition}/>
      <Column
        title={"编译器"} align={"center"}
        dataIndex={"language"}
        key={"language"}
        width={150}
        render={renderCompilerContent}/>
      <Column
        title={"时间消耗"} align={"center"}
        dataIndex={"timeCost"}
        key={"timeCost"}
        render={renderTimeCost}
        width={150}/>
      <Column
        title={"内存消耗"} align={"center"}
        dataIndex={"memoryCost"}
        key={"memoryCost"}
        width={150}
        render={renderMemoryCost}/>
      <Column
        title={"提交用户"} align={"center"}
        dataIndex={"creator"}
        key={"creator"}
        width={150}
        render={renderCreator}/>
    </Table>
  )
}

export default SubmissionTable;