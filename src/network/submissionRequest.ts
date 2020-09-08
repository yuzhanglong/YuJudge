/*
 * File: submissionRequest.ts
 * Description: 提交相关网络请求的封装
 * Created: 2020/7/31 13:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request from "./interceptor";
import {Submission} from "../models/submission";

// 提交代码
export const submitCode = (submission: Submission) => {
  return request.post(
    "/submission/submit_code",
    submission,
    {
      headers: {
        loading: true
      }
    }
  )
}


// 通过problemId获取提交
export const getSubmissionByProblemId = (start: number, count: number, problemId: number) => {
  return request.get(
    "/submission/get_submissions",
    {
      params: {
        start: start,
        count: count,
        problemId: problemId
      }
    }
  )
}


// 获取某个提交的详细信息
export const getSubmissionById = (submissionId: number) => {
  return request.get(
    "/submission/get_submission_detail",
    {
      params: {
        submissionId: submissionId
      }
    }
  )
}

// 获取某个时间区间内的提交统计
export const getRecentSubmission = (begin: string, end: string, uid: number | null = null) => {
  return request.get(
    "/submission/get_user_recent_submission",
    {
      params: {
        begin: begin,
        end: end,
        uid: uid
      }
    }
  )
}

// 用户判题结果统计
export const getUserJudgeResultCount = (uid: number | null = null) => {
  return request.get(
    "/submission/get_user_judge_result_count",
    {
      params: {
        uid: uid
      }
    }
  )
}

// 获取提交调度线程池相关配置
export const getSubmissionThreadPoolConfiguration = () => {
  return request.get(
    "/submission/thread_pool_config"
  )
}

//设置提交线程池最大工作数目
export const setSubmissionThreadPoolMaxSize = (size: number) => {
  return request.put(
    "/submission/thread_pool_max_working_size",
    {
      maxWorkingAmount: size
    }
  );
}

// 改变提交状态
export const changeSubmissionCondition = (submissionId: number, condition: string) => {
  return request.put(
    "/submission/condition",
    {
      condition: condition,
      submissionId: submissionId
    }
  )
}