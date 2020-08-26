/*
 * File: submissionRequest.ts
 * Description: 提交相关网络请求的封装
 * Created: 2020/7/31 13:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request, {REQUEST_TYPES} from "./request";
import {SubmissionInfo} from "../models/submissionInfo";
import {getTokenFromStorage} from "../utils/dataPersistence";

// 提交代码
export const submitCode = (submission: SubmissionInfo) => {
  return request.post(
    "/submission/submit_code",
    submission,
    {
      method: REQUEST_TYPES.POST,
      headers: {
        Authorization: getTokenFromStorage()
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
      },
      method: REQUEST_TYPES.GET
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
      },
      method: REQUEST_TYPES.GET
    }
  )
}

// 获取某个时间区间内的提交统计
export const getRecentSubmission = (begin: string, end: string) => {
  return request.get(
    "/submission/get_user_recent_submission",
    {
      params: {
        begin: begin,
        end: end
      },
      headers: {
        "Authorization": getTokenFromStorage()
      }
    }
  )
}

// 用户判题结果统计
export const getUserJudgeResultCount = () => {
  return request.get(
    "/submission/get_user_judge_result_count",
    {
      headers: {
        "Authorization": getTokenFromStorage()
      }
    }
  )
}