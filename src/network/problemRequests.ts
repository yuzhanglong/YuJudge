/*
 * File: problemRequests.ts
 * Description: problem相关接口的二次封装
 * Created: 2020-7-19 18:02
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request, {REQUEST_TYPES} from "./request";
import {ProblemLimitation, ProblemTestCase} from "../models/problem";


// 通过id来获取problem的基本信息
export const getProblemById = (problemId: string) => {
  return request.get(
    "/problem/get_problem_by_id/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}


// 分页获取多个problem
export const getProblems = (start: number, count: number) => {
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


// 获取problem的详细信息
export const getProblemDetailedById = (problemId: number) => {
  return request.get(
    "/problem/get_problem_detailed_by_id/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}


// 获取problem的一个或多个解决方案
export function getSolutionByProblemId(problemId: number) {
  return request.get(
    "/problem/get_solutions/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}


// 关闭某个problem
export const closeProblem = (problemId: number) => {
  return request.get(
    "/problem/close_problem/" + problemId,
    {
      method: REQUEST_TYPES.GET
    }
  )
}


// 设置限制
export const setLimitations = (problemId: number, limitation: ProblemLimitation) => {
  return request.post(
    "/problem/set_limitation/" + problemId,
    limitation,
    {
      method: REQUEST_TYPES.GET
    }
  )
}


// 添加解决方案
export const createSolution = (problemId: number, solution: ProblemTestCase) => {
  return request.post(
    "/problem/create_solution/" + problemId,
    solution,
    {
      method: REQUEST_TYPES.POST
    }
  )
}

// 获取近期problems
export const getRecentProblems = (size: number) => {
  return request.get(
    "/problem/get_recent_problem",
    {
      params: {
        size: size
      }
    }
  )
}