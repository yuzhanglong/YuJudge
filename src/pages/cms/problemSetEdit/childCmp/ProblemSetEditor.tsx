/*
 * File: ProblemSetEditor.tsx
 * Description: 题目集编辑器
 * Created: 2020-08-09 23:12:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Button, Card, message, Popconfirm as PopConfirm } from 'antd'
import ProblemTable from '../../../../components/problemTable/ProblemTable'
import { Problem } from '../../../../models/problem'
import { RouteComponentProps } from 'react-router-dom'
import EditorTip from '../../../../components/editorTip/editorTip'
import BasicInfoEditor from './BasicInfoEditor'
import { ProblemSet } from '../../../../models/problemSet'
import { dateRangeMomentArrayToTimeStampArray } from '../../../../utils/dateTime'
import { removeProblemSet, updateProblemSetBasicInfo } from '../../../../network/problemSetRequest'
import RcQueueAnim from 'rc-queue-anim'
import style from '../problemSetEdit.module.scss'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface ProblemSetEditorProps {
  problems: Problem[];
  problemSet: ProblemSet;
  onProblemAdd: () => void;
  onRemoveFormProblemSet: (problemId: number) => void;
  problemSetProblemsTotalPage: number;
  onPageChange: (n: number) => void;
}

const ProblemSetEditor: React.FC<ProblemSetEditorProps & RouteComponentProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  // 跳转编辑界面
  const gotoEditProblem = (problemId: number) => {
    props.history.push(`/cms/problem_manage/problems/edit/${problemId}`)
  }

  // 移除按钮被点击
  const onRemoveButtonClick = (content: any) => {
    const problemId = content.id
    props.onRemoveFormProblemSet(problemId)
  }

  // 编辑确认
  const onEditConfirm = (formData: any) => {
    if (formData) {
      const rangeTmp = dateRangeMomentArrayToTimeStampArray(formData.timeRange)
      const problemSet: ProblemSet = {
        name: formData.name,
        description: formData.description,
        startTime: rangeTmp[0].getTime(),
        deadline: rangeTmp[1].getTime(),
        id: props.problemSet.id,
        open: formData.open,
        allowedLanguage: formData.allowedLanguage
      }
      updateProblemSetBasicInfo(problemSet)
        .then(() => {
          message.success(localContext.problemSet.editSuccess)
        })
        .catch(() => {
        })
    }
  }

  // 移除题目集
  const onRemoveProblemSetButtonClick = () => {
    if (props.problemSet.id) {
      removeProblemSet(props.problemSet.id)
        .then(() => {
          message.success(localContext.problemSet.removeSuccess)
        })
      props.history.replace('/cms/problem_manage/problem_sets')
    }
  }

  return (
    <Card title={localContext.problemSet.edit}>
      <RcQueueAnim>
        <div key={'problem-editor-basic-info'}>
          <Card
            type='inner'
            title={
              <div className={style.cms_problem_set_edit_item_title}>
                {localContext.problemSet.basicInfo}
              </div>
            }>
            <BasicInfoEditor
              problemSet={props.problemSet}
              onEditConfirm={onEditConfirm} />
          </Card>
        </div>
        <div key={'problem-editor-problems'}>
          <Card
            type='inner'
            style={{ marginTop: 10 }}
            title={
              <div className={style.cms_problem_set_edit_item_title}>
                {localContext.problemSet.ownProblem}
              </div>
            }
            extra={
              <Button type={'link'} onClick={() => props.onProblemAdd()}>
                {localContext.problemSet.addProblem}
              </Button>
            }>
            <ProblemTable
              tableSize={'small'}
              totalPage={props.problemSetProblemsTotalPage}
              onPageChange={props.onPageChange}
              problems={props.problems}
              onProblemEdit={gotoEditProblem}
              otherOperations={(content: any) => (
                <PopConfirm
                  title={localContext.problemSet.removeConfirm}
                  okText={localContext.confirm}
                  cancelText={localContext.cancel}
                  onConfirm={() => onRemoveButtonClick(content)}>
                  <Button type={'link'} danger>
                    {localContext.problemSet.removeFromProblemSet}
                  </Button>
                </PopConfirm>
              )} />
          </Card>
        </div>
        <div key={'problem-editor-danger'}>
          <Card
            type='inner'
            style={{ marginTop: 10 }}
            title={<div className={style.cms_problem_set_edit_item_title_danger}>
              {localContext.problemSet.danger}
            </div>}>
            <EditorTip
              title={localContext.problemSet.delete}
              content={localContext.problemSet.deleteWarn}>
              <Button danger onClick={() => onRemoveProblemSetButtonClick()}>
                {localContext.delete}
              </Button>
            </EditorTip>
          </Card>
        </div>
      </RcQueueAnim>
    </Card>
  )
}

export default ProblemSetEditor
