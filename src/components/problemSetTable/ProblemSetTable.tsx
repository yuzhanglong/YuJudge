/*
 * File: ProblemSetTable.tsx
 * Description: 题目集表格
 * Created: 2020-08-09 13:01:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {ProblemSet} from "../../models/problemSet";
import {Button, Table} from "antd";
import {TablePaginationConfig} from "antd/es/table";
import {SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE} from "../../config/config";
import {SizeType} from "antd/lib/config-provider/SizeContext";
import Column from "antd/lib/table/Column";
import {timestampToDateTime} from "../../utils/dateTime";
import {UserInfo} from "../../models/user";
import {Link} from "react-router-dom";
import {PROGRAM_LANGUAGE_NAME} from "../../common/programLanguage";

interface ProblemSetTableProps {
  problemSets: ProblemSet[];
  showPagination?: boolean;
  totalPage?: number;
  onPageChange?: (page: number) => void;
  tableSize?: SizeType;
  isLoading?: boolean;
  onEditButtonClick?: (id: number) => void;
  otherOperations?: React.ReactNode;
  showOperations?: boolean;
  allowTitleRoute?: boolean;
}

const ProblemSetTable: React.FunctionComponent<ProblemSetTableProps> = (props) => {
  // 分页配置
  const paginationProp: TablePaginationConfig = {
    total: (props.totalPage || 1) * SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE,
    defaultPageSize: SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE
  }

  // 当页码改变时
  const onPageChange = (event: TablePaginationConfig) => {
    if (props.onPageChange && event.current) {
      props.onPageChange(event.current);
    }
  }

  // 渲染时间相关
  const renderTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>)
  }

  // 渲染创建者
  const renderCreator = (creator: UserInfo) => {
    return (<div>{creator.nickname}</div>)
  }

  // 渲染操作相关
  const renderOperations = (content: any) => {
    return (
      <div>
        <Button
          type="link"
          onClick={() => props.onEditButtonClick ? props.onEditButtonClick(content.id) : null}>
          编辑题目集
        </Button>
        {props.otherOperations}
      </div>
    )
  }

  // 渲染题目集名称
  const renderProblemSetName = (data: ProblemSet) => {
    if (props.allowTitleRoute) {
      return (
        <Link to={`/common/problem_set/${data.id}/overview`}>
          {data.name}
        </Link>
      )
    }
    return (<div>{data.name}</div>)
  }

  // 获取允许的编程语言信息
  const getAllowedLanguageInfo = (languages: string[]) => {
    if (languages) {
      let res = "";
      const len = languages.length;
      for (let i = 0; i < len; i++) {
        res = res + PROGRAM_LANGUAGE_NAME[languages[i]];
        if (i < len - 1) {
          res += " / ";
        }
      }
      return res;
    }
    return "---";
  }

  return (
    <div>
      <Table
        loading={props.isLoading}
        dataSource={props.problemSets}
        rowKey={"id"}
        pagination={props.showPagination ? paginationProp : false}
        onChange={(e: TablePaginationConfig) => onPageChange(e)}
        size={props.tableSize}>
        <Column
          title={"编号"}
          dataIndex={"id"}
          key={"id"}/>
        <Column
          title={"题目集名称"}
          key={"name"}
          render={renderProblemSetName}/>
        <Column
          title={"判题偏好"}
          dataIndex={"judgePreference"}
          key={"judgePreference"}/>
        <Column
          title={"开始时间"}
          dataIndex={"startTime"}
          key={"startTime"}
          render={renderTime}/>
        <Column
          title={"截止时间"}
          dataIndex={"deadline"}
          key={"deadline"}
          render={renderTime}/>
        <Column
          title={"支持语言"}
          dataIndex={"allowedLanguage"}
          key={"allowedLanguage"}
          render={getAllowedLanguageInfo}/>
        <Column
          title={"创建者"}
          dataIndex={"creator"}
          key={"creator"}
          render={renderCreator}/>
        {
          props.showOperations &&
          <Column
            title={"操作"}
            key={"number"}
            width={150}
            render={renderOperations}
            align={"center"}/>
        }
      </Table>
    </div>
  )
}

ProblemSetTable.defaultProps = {
  showPagination: true,
  tableSize: undefined,
  isLoading: false,
  showOperations: true,
  allowTitleRoute: false
}

export default ProblemSetTable;