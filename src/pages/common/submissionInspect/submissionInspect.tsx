/*
 * File: submissionInspect.tsx
 * Description: 查看提交的页面
 * Created: 2020-8-26 14:15:08
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { useContext, useEffect, useState } from 'react'
import {RouteComponentProps} from 'react-router-dom';
import SubmissionTable from './childCmp/SubmissionTable';
import SubmissionDetailModal from './childCmp/SubmissionDetailModal';
import {Submission} from '../../../models/submission';
import {SUBMISSION_REQUEST_TASK_TIME, SUBMISSION_SINGLE_PAGE_SIZE} from '../../../config/config';
import {getSubmissionById, getSubmissionByProblemId} from '../../../network/submissionRequest';
import {message} from 'antd';
import {BaseResponse} from '../../../models/common';
import {PROBLEM_SET_FORBIDDEN} from '../../../config/code';
import {goToResult} from '../../../utils/route';
import {ResultPageParam} from '../../../common/enumerations';
import { LocalContext } from '../../../components/localContext/LocalContext'

interface SubmissionInspectProps {

}

const SubmissionInspect: React.FunctionComponent<SubmissionInspectProps & RouteComponentProps> = (props) => {

  const params: any = props.match.params;
  const problemId: number = params.problemId;

  // 当前活跃的页码
  const [activePage, setActivePage] = useState(1);

  // 提交表格
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // 提交详情是否可视
  const [isSubmissionDetailVisible, setIsSubmissionIsVisible] = useState(false);

  // 总的提交数目
  const [submissionCount, setSubmissionCount] = useState(1);


  // 选中的提交细节内容
  const [activeSubmission, setActiveSubmission] = useState();

  // local
  const localContext = useContext(LocalContext)

  // 管理轮询任务
  useEffect(() => {
    const id = setInterval(() => {
      getProblemSubmission(problemId, activePage);
    }, SUBMISSION_REQUEST_TASK_TIME);
    return () => {
      // 轮询任务id不能由useState管理，
      // 否则组件销毁再来执行clearInterval会造成id为undefined的情况
      clearInterval(id);
    }
    // eslint-disable-next-line
  }, [activePage, problemId]);


  useEffect(() => {
    getProblemSubmission(problemId, activePage);
    // eslint-disable-next-line
  }, [activePage, problemId]);

  // 分页获取当前问题下的所有提交
  const getProblemSubmission = (problemId: number, page: number) => {
    getSubmissionByProblemId(page - 1, SUBMISSION_SINGLE_PAGE_SIZE, problemId)
      .then(res => {
        setSubmissions(res.data.items);
        setSubmissionCount(res.data.total);
      })
      .catch(() => {
        message.error(localContext.submissionInspect.cannotGetSubmission);
      })
  }

  // 用户切换页码
  const onPaginationChange = (currentPage: number) => {
    setActivePage(currentPage);
    // 立刻刷新一次
    getProblemSubmission(problemId, currentPage);
  }

  // 展示submission细节信息
  const showSubmissionDetail = (event: any) => {
    const submissionId: number = event.id;
    getSubmissionDetail(submissionId);
    setIsSubmissionIsVisible(true);
  }

  // 获取提交细节内容
  const getSubmissionDetail = (submissionId: number) => {
    getSubmissionById(submissionId)
      .then(res => {
        setActiveSubmission(res.data);
      })
      .catch((err: BaseResponse) => {
        if (err.code === PROBLEM_SET_FORBIDDEN) {
          goToResult(ResultPageParam.PROBLEM_SET_FORBIDDEN);
        } else {
          goToResult(ResultPageParam.NOT_FOUND);
        }
      })
  }

  return (
    <div>
      <SubmissionTable
        submissions={submissions}
        activePage={activePage}
        total={submissionCount}
        onPageChange={onPaginationChange}
        onSubmissionTagClick={showSubmissionDetail}/>
      <SubmissionDetailModal
        isVisible={isSubmissionDetailVisible}
        onClose={() => setIsSubmissionIsVisible(false)}
        submission={activeSubmission}
        problemName={''}/>
    </div>
  )
}

export default SubmissionInspect;
