/*
 * File: submissionRequest.ts
 * Description: 提交相关网络请求的封装
 * Created: 2020/7/31 13:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request, {REQUEST_TYPES} from "./request";
import {Submission} from "../models/submission";

// 提交代码
export const submitCode = (submission: Submission) => {
  return request.post(
    "/submission/submit_code",
    submission,
    {
      method: REQUEST_TYPES.POST
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