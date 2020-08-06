import React from "react";
import {timestampToDateTime} from "../../utils/DateTimeUtil";
import {Button, Table, Tag} from "antd";
import {Problem} from "../../models/problem";
import Column from "antd/lib/table/Column";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE} from "../../config/config";
import {TablePaginationConfig} from "antd/lib/table/interface";

interface ProblemTableProps {
  isShowCreateTime?: boolean;
  isShowTags?: boolean;
  isShowOperations?: boolean;
  onProblemEdit?: (problemId: number) => void;
  problems: Problem[];
  totalPage?: number;
  onPageChange?: (page: number) => void;
}


const ProblemTable: React.FunctionComponent<ProblemTableProps> = (props) => {
  // 问题创建时间
  const renderCreateTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>)
  }

  // 渲染标签
  const renderTags = (tags: string[]) => {
    if (tags == null) return null;
    return (
      <div>
        {
          tags.map((tag) => {
            return (
              <Tag color={"#409eff"} key={tag}>
                {tag}
              </Tag>
            );
          })
        }
      </div>
    )
  }

  // 编辑按钮被按下
  const onEditButtonClick = (content: Problem) => {
    const problemId = content.id;
    if (props.onProblemEdit) {
      if (problemId != null) {
        props.onProblemEdit(problemId);
      }
    }
  }

  // 渲染操作相关
  const renderOperations = (content: any) => {
    return (
      <Button type="link"
              onClick={() => onEditButtonClick(content)}>
        编辑问题
      </Button>
    )
  }

  // 当页码改变时
  const onPageChange = (event: TablePaginationConfig) => {
    if (props.onPageChange && event.current) {
      props.onPageChange(event.current);
    }
  }

  return (
    <Table dataSource={props.problems}
           rowKey={"id"}
           pagination={{
             total: (props.totalPage || 1) * SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE,
             defaultPageSize: SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE
           }}
           onChange={(e: TablePaginationConfig) => onPageChange(e)}>
      <Column title={"题号"} dataIndex={"id"}
              key={"number"} width={150}/>
      <Column title={"问题名称"}
              dataIndex={"name"}
              key={"number"}
              width={150}/>
      {props.isShowTags &&
      <Column title={"标签"}
              dataIndex={"characterTags"}
              key={"number"}
              width={250}
              render={renderTags}/>}
      {props.isShowCreateTime &&
      <Column title={"创建时间"}
              dataIndex={"createTime"}
              key={"number"}
              width={150}
              render={renderCreateTime}/>}
      {props.isShowOperations &&
      <Column title={"操作"}
              key={"number"}
              width={150}
              render={renderOperations}
              align={"center"}/>}
    </Table>
  )
}

ProblemTable.defaultProps = {
  isShowCreateTime: true,
  isShowOperations: true,
  isShowTags: true,
  totalPage: PAGE_BEGIN
}

export default ProblemTable;