/*
 * File: problemRequests.ts
 * Description: problem相关接口的二次封装
 * Created: 2020-7-19 18:02
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request, {REQUEST_TYPES} from "./request";

/**
 * @author yuzhanglong
 * @description 通过id来获取problem的基本信息
 * @date 22020-7-19 13:10:27
 */
export function getProblemById(problemId: string) {
  return request.get(
    "/problem/get_problem_by_id/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}


export function getProblems(start: number, count: number) {
  return request.get(
    "/problem/get_problems",
    {
      params: {
        start: start,
        count: count
      }
    }
  )
}