/*
 * File: ProblemSetTable.tsx
 * Description: 题目集表格
 * Created: 2020-08-09 13:01:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { ProblemSet } from '../../models/problemSet'
import { Button, Table } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import { SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE } from '../../config/config'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { timestampToDateTime } from '../../utils/dateTime'
import { UserInfo } from '../../models/user'
import { Link } from 'react-router-dom'
import { PROGRAM_LANGUAGE_NAME } from '../../common/programLanguage'
import { LocalContext } from '../localContext/LocalContext'

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
  // local
  const localContext = useContext(LocalContext)

  // 分页配置
  const paginationProp: TablePaginationConfig = {
    total: (props.totalPage || 1) * SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE,
    defaultPageSize: SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE
  }

  // 当页码改变时
  const onPageChange = (event: TablePaginationConfig) => {
    if (props.onPageChange && event.current) {
      props.onPageChange(event.current)
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
          type='link'
          onClick={() => props.onEditButtonClick ? props.onEditButtonClick(content.id) : null}>
          {localContext.problemSet.edit}
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
      let res = ''
      const len = languages.length
      for (let i = 0; i < len; i++) {
        res = res + PROGRAM_LANGUAGE_NAME[languages[i]]
        if (i < len - 1) {
          res += ' / '
        }
      }
      return res
    }
    return '---'
  }

  return (
    <div>
      <Table
        loading={props.isLoading}
        dataSource={props.problemSets}
        rowKey={'id'}
        pagination={props.showPagination ? paginationProp : false}
        onChange={(e: TablePaginationConfig) => onPageChange(e)}
        size={props.tableSize}>
        <Table.Column
          title={localContext.problemSet.id}
          dataIndex={'id'}
          key={'id'} />
        <Table.Column
          title={localContext.problemSet.name}
          key={'name'}
          render={renderProblemSetName} />
        <Table.Column
          title={localContext.problemSet.preference}
          dataIndex={'judgePreference'}
          key={'judgePreference'} />
        <Table.Column
          title={localContext.startTime}
          dataIndex={'startTime'}
          key={'startTime'}
          render={renderTime} />
        <Table.Column
          title={localContext.deadline}
          dataIndex={'deadline'}
          key={'deadline'}
          render={renderTime} />
        <Table.Column
          title={localContext.problemSet.languageSupport}
          dataIndex={'allowedLanguage'}
          key={'allowedLanguage'}
          render={getAllowedLanguageInfo} />
        <Table.Column
          title={localContext.problemSet.author}
          dataIndex={'creator'}
          key={'creator'}
          render={renderCreator} />
        {
          props.showOperations &&
          <Table.Column
            title={localContext.operation}
            key={'number'}
            width={150}
            render={renderOperations}
            align={'center'} />
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

export default ProblemSetTable
