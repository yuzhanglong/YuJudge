/*
 * File: JudgeHostTable.tsx
 * Description: 判题服务器的相关表格
 * Created: 2020-08-17 11:41:59
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { useContext } from 'react'
import { JudgeHostCondition, JudgeHostInfo } from '../../models/judgeHost'
import { Table, Tag } from 'antd'
import { LocalContext } from '../localContext/LocalContext'

interface JudgeHostTable {
  judgeHosts: JudgeHostInfo[];
  operations?: (value: any) => React.ReactNode;
  isLoading?: boolean;
}

const JudgeHostTable: React.FunctionComponent<JudgeHostTable> = (props) => {
  // local
  const localContext = useContext(LocalContext)
  // 渲染状态
  const renderCondition = (value: JudgeHostInfo) => {
    return (
      <Tag color={getConditionBadgeStatus(value)}>
        {getConditionDescription(value)}
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
        {value.cpuCostPercentage !== null ? value.cpuCostPercentage + '%' : '---'}
      </div>
    )
  }

  // 渲染cpu消耗百分比
  const renderMemoryCostPercentage = (value: JudgeHostCondition) => {
    return (
      <div>
        {value.memoryCostPercentage !== null ? value.memoryCostPercentage + '%' : '---'}
      </div>
    )
  }

  // 渲染当前判题个数数量
  const renderWorkingAmount = (value: JudgeHostCondition) => {
    return (
      <div>{value.workingAmount !== null ? value.workingAmount : '---'}</div>
    )
  }

  // 渲染cpu核心数
  const renderCpuCoreAmount = (value: JudgeHostCondition) => {
    return (
      <div>{value.cpuCoreAmount !== null ? value.cpuCoreAmount : '---'}</div>
    )
  }


  // 获取判题机状态描述
  const getConditionDescription = (value: JudgeHostInfo) => {
    if (!value.connection) {
      return
    }
    return value?.active ? localContext.judgeHost.running : localContext.judgeHost.stopped
  }

  // 获取判题机状态描述颜色
  const getConditionBadgeStatus = (value: JudgeHostInfo) => {
    if (!value.connection) {
      return 'red'
    }
    return value?.active ? 'green' : 'yellow'
  }

  return (
    <Table
      dataSource={props.judgeHosts}
      rowKey={'id'}
      loading={props.isLoading}>
      <Table.Column
        title={localContext.condition}
        key={'active'}
        render={renderCondition}
        width={100} />
      <Table.Column
        title={localContext.name}
        dataIndex={'name'}
        align={'center'}
        key={'name'}
        width={250} />
      <Table.Column
        title={localContext.judgeHost.cpuCoreAmount}
        dataIndex={'condition'}
        key={'cpu-core'}
        align={'center'}
        render={renderCpuCoreAmount} />
      <Table.Column
        title={localContext.judgeHost.currentJudgeAmount}
        align={'center'}
        dataIndex={'condition'}
        key={'currentWorking'}
        render={renderWorkingAmount} />
      <Table.Column
        title={localContext.judgeHost.cpuCost}
        align={'center'}
        dataIndex={'condition'}
        key={'cpu'} render={renderCpuCostPercentage} />
      <Table.Column
        align={'center'}
        title={localContext.judgeHost.memoryCost}
        dataIndex={'condition'}
        key={'memory'} render={renderMemoryCostPercentage} />
      {
        props.operations &&
        <Table.Column
          align={'center'}
          title={localContext.operation}
          key={'operation'}
          render={renderOperations} />
      }
    </Table>
  )
}

JudgeHostTable.defaultProps = {
  isLoading: false
}

export default JudgeHostTable
