/*
 * File: ProblemTable.tsx
 * Description: problem的表格组件
 * Created: 2020-08-08 18:10:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useState} from "react";
import {timestampToDateTime} from "../../utils/dateTime";
import {Button, Table, Tag} from "antd";
import {Problem} from "../../models/problem";
import Column from "antd/lib/table/Column";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE} from "../../config/config";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import {tenDecimalToTwentySixDecimal} from "../../utils/math";

interface ProblemTableProps {
  isShowCreateTime?: boolean;
  isShowTags?: boolean;
  isShowOperations?: boolean;
  onProblemEdit?: (problemId: number) => void;
  problems: Problem[];
  totalPage?: number;
  onPageChange?: (page: number) => void;
  tableSize?: SizeType;
  showPagination?: boolean;
  isLoading?: boolean;
  isShowCheckBoxGroup?: boolean;
  onSelectionSelected?: (ids: number[]) => void;
  otherOperations?: (props: any) => React.ReactNode;
  isShowProblemOrder?: boolean;
  showEditButton?: boolean;
}


const ProblemTable: React.FunctionComponent<ProblemTableProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(PAGE_BEGIN - 1);

  // 问题创建时间
  const renderCreateTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>)
  }

  // 分页配置
  const paginationProp: TablePaginationConfig = {
    total: (props.totalPage || 1) * SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE,
    defaultPageSize: SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE
  }

  // 渲染标签
  const renderTags = (tags: string[]) => {
    if (tags == null || !tags.length) return <div>此题目没有标签</div>
    return (
      <div>
        {
          tags.map((tag) => {
            // TODO: 具体颜色信息应该由前端传过来
            return (
              <Tag color={tag === "入门" ? "purple" : "geekblue"} key={tag}>
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
      <div>
        {
          props.showEditButton && <Button
            type="link"
            onClick={() => onEditButtonClick(content)}>
            编辑问题
          </Button>}
        {
          props.otherOperations &&
          props.otherOperations(content)
        }
      </div>
    )
  }

  // 当页码改变时
  const onPageChange = (event: TablePaginationConfig) => {
    if (props.onPageChange && event.current) {
      setCurrentPage(event.current - 1);
      props.onPageChange(event.current);
    }
  }

  // 表左侧多选框配置
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      if (props.onSelectionSelected) {
        props.onSelectionSelected(selectedRowKeys);
      }
    },
  };

  // 渲染题号(order)
  const renderProblemOrder = (value: any, record: any, index: number) => {
    const finalIndex = (currentPage * SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE) + (index + 1);
    return <div>{tenDecimalToTwentySixDecimal(finalIndex)}</div>
  }

  return (
    <Table dataSource={props.problems}
           rowKey={"id"}
           loading={props.isLoading}
           pagination={props.showPagination ? paginationProp : false}
           onChange={(e: TablePaginationConfig) => onPageChange(e)}
           size={props.tableSize}
           rowSelection={
             props.isShowCheckBoxGroup ? {
               type: "checkbox",
               ...rowSelection,
             } : undefined}>
      {
        props.isShowProblemOrder &&
        <Column title={"序号"} width={150}
                render={renderProblemOrder}/>
      }

      <Column title={"题目ID"} dataIndex={"id"}
              key={"number"} width={150}/>
      <Column title={"问题名称"}
              dataIndex={"name"}
              key={"name"}
              width={150}/>
      {props.isShowTags &&
      <Column title={"标签"}
              dataIndex={"characterTags"}
              key={"标签"}
              width={250}
              render={(value: any) => renderTags(value)}/>}
      {props.isShowCreateTime &&
      <Column title={"创建时间"}
              dataIndex={"createTime"}
              key={"创建时间"}
              width={180}
              render={renderCreateTime}/>}
      {props.isShowOperations &&
      <Column title={"操作"}
              key={"操作"}
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
  totalPage: PAGE_BEGIN,
  tableSize: undefined,
  showPagination: true,
  isLoading: false,
  isShowCheckBoxGroup: false,
  isShowProblemOrder: true,
  showEditButton: true
}

export default ProblemTable;