/*
 * File: submissionRequest.ts
 * Description: 提交相关网络请求的封装
 * Created: 2020/7/31 13:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request, {REQUEST_TYPES} from "./request";
import {Submission} from "../models/submission";

/**
 * @author yuzhanglong
 * @description 提交用户代码
 * @date 2020-7-31 13:34:42
 */
export function submitCode(submission: Submission) {
  return request.post(
    "/submission/submit_code",
    submission,
    {
      method: REQUEST_TYPES.POST
    }
  )
}


export function getSubmissionByProblemId(start: number, count: number, problemId: number) {
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