import React from 'react';
import {Card, Button} from 'antd';
import {Problem, ProblemTestCase} from '../../../../../models/problem';
import LimitationForm from './childCmp/LimitationForm';
import BasicInfoForm from './childCmp/BasicInfoForm';
import DangerZoneForm from './childCmp/DangerZoneForm';
import TestCaseTable from '../../../../../components/testCaseTable/TestCaseTable';
import style from '../../problemEdit.module.scss';


interface ProblemEditorProps {
  problem: Problem;
  solutions: ProblemTestCase[];
  onSolutionAdd: () => void;
  onSolutionDelete: (testCaseId: number) => void;
}

const ProblemEditor: React.FunctionComponent<ProblemEditorProps> = (props) => {

  // 渲染测试点表格操作区
  const renderTestCaseTableOperations = (value: ProblemTestCase) => {
    const testCaseId = value.id;
    return (
      <div>
        <Button type={'link'} danger onClick={() => {
          onSolutionDelete(testCaseId)
        }}>
          删除
        </Button>
      </div>
    )
  }

  // 解决方案被删除
  const onSolutionDelete = (value: number | undefined) => {
    if (value) {
      props.onSolutionDelete(value);
    }
  }

  return (
    <Card title="QuestionEdit">
      <Card
        className={style.cms_problem_edit_item}
        title={
          <div className={style.cms_problem_edit_item_title}>
            basicInformation
          </div>
        }>
        <BasicInfoForm problem={props.problem}/>
      </Card>
      <Card
        type="inner"
        className={style.cms_problem_edit_item}
        title={
          <div className={style.cms_problem_edit_item_title}>
            SubmissionLimit
          </div>
        }>
        <LimitationForm problem={props.problem}/>
      </Card>
      <Card
        className={style.cms_problem_edit_item}
        title={
          <div className={style.cms_problem_edit_item_title}>
            testCases
          </div>
        } extra={
        <Button type={'link'} onClick={props.onSolutionAdd}>
          AddTestCases
        </Button>
      }>
        <TestCaseTable
          testCases={props.solutions}
          operations={renderTestCaseTableOperations}
          showDownLoadUrlColumn/>
      </Card>
      <Card
        key={'cms_problem_edit_item'}
        className={style.cms_problem_edit_item}
        title={<div className={style.cms_problem_edit_item_title_danger}>Dangerous</div>}>
        <DangerZoneForm problem={props.problem}/>
      </Card>
    </Card>
  );
}

export default ProblemEditor;
