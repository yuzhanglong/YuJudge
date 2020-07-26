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
 * @date 2020-7-19 13:10:27
 */
export function getProblemById(problemId: string) {
  return request.get(
    "/problem/get_problem_by_id/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}

/**
 * @author yuzhanglong
 * @description 分页获取多个problem
 * @date 2020-7-19
 */
export function getProblems(start: number, count: number) {
  return request.get(
    "/problem/get_problems",
    {
      method: REQUEST_TYPES.GET,
      params: {
        start: start,
        count: count
      }
    }
  )
}

/**
 * @author yuzhanglong
 * @description 获取problem的详细信息
 * @date 2020-7-23
 */
export function getProblemDetailedById(problemId: number) {
  return request.get(
    "/problem/get_problem_detailed_by_id/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}

/**
 * @author yuzhanglong
 * @description 获取problem的一个或多个解决方案
 * @date 2020-7-23 23:02
 */
export function getSolutionByProblemId(problemId: number) {
  return request.get(
    "/problem/get_solutions/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}

/**
 * @author yuzhanglong
 * @description 关闭某个problem
 * @date 2020-7-26 08:27
 */
export function closeProblem(problemId: number) {
  return request.get(
    "/problem/close_problem/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}