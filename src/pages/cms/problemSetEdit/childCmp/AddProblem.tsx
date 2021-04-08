/*
 * File: AddProblem.tsx
 * Description: 题目集编辑界面使用，用来添加problem的表单
 * Created: 11:05 上午
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useState } from 'react'
import ProblemTable from '../../../../components/problemTable/ProblemTable'
import { Problem } from '../../../../models/problem'
import { Button, Col, Input, message, Modal, Row } from 'antd'
import { updateProblemSetProblems } from '../../../../network/problemSetRequest'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ADD_PROBLEM_MAX_SHOW } from '../../../../config/config'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface AddProblemProps {
  problems: Problem[];
  visible: boolean;
  totalPage: number | undefined;
  onProblemPageChange: (page: number) => void;
  onSearchConfirm?: (val: string) => void;
  onCancel: () => void;
  problemSetId: number;
  onAddSuccess: () => void;
}

const AddProblem: React.FunctionComponent<AddProblemProps> = (props) => {
  // 选中的行
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([])

  // local
  const localContext = useContext(LocalContext)

  // 搜索按钮被按下
  const onSearchButtonClick = (value: string) => {
    if (props.onSearchConfirm) {
      props.onSearchConfirm(value)
    }
  }

  // 添加确认
  const onAddConfirm = () => {
    updateProblemSetProblems(props.problemSetId, selectedRowIds)
      .then(() => {
        message.success(localContext.problem.addSuccess)
        props.onAddSuccess()
      })
  }

  // 当页码改变时
  const onPaginationChange = (val: number) => {
    setSelectedRowIds([])
    props.onProblemPageChange(val)
  }

  // 用户添加确认
  const onAddProblemConfirm = () => {
    Modal.confirm({
      title: `${localContext.problem.willProblemAddToProblemSet}`,
      icon: <ExclamationCircleOutlined />,
      content: (<div>{getAddConfirmContent()}</div>),
      okText: localContext.confirm,
      okType: 'primary',
      cancelText: localContext.cancel,
      onOk() {
        onAddConfirm()
      }
    })
  }

  // 获取用户添加确认的确认文本
  const getAddConfirmContent = () => {
    const len = selectedRowIds.length
    const finalArr = selectedRowIds.slice(0, ADD_PROBLEM_MAX_SHOW)
    // 是否超出可以显示的个数？对于超出的部分，我们不会显示，而是用<p>等{len}个题目</p>来告知用户
    const isOutMax: boolean = len > finalArr.length
    return (
      <div style={{ paddingTop: 13 }}>
        {finalArr.map(res => {
          return <p>{res}</p>
        })}
        {isOutMax && <p>{`${localContext.and} ${len} ${localContext.problem.base}`}</p>}
      </div>

    )
  }


  return (
    <Modal
      visible={props.visible}
      title={localContext.problem.addProblemToProblemSet}
      width={1000}
      footer={false}
      onCancel={props.onCancel}>
      <Row
        align={'middle'}
        justify={'space-between'}
        style={{ marginBottom: 18 }}>
        <Col>
          <Input.Search
            placeholder={localContext.problem.problemWord}
            onSearch={value => onSearchButtonClick(value)}
            style={{ width: 200 }}
          />
        </Col>
        <Col>
          <Button
            type={'primary'}
            onClick={() => onAddProblemConfirm()} disabled={!selectedRowIds.length}>
            {localContext.problem.addSelectedProblem}
          </Button>
        </Col>
      </Row>
      <ProblemTable
        onSelectionSelected={(val) => setSelectedRowIds(val)}
        tableSize={'middle'}
        onPageChange={onPaginationChange}
        totalPage={props.totalPage}
        isShowCheckBoxGroup={true}
        problems={props.problems}
        isShowOperations={false} />
    </Modal>
  )
}

AddProblem.defaultProps = {
  visible: false
}

export default AddProblem
