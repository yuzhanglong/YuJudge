/*
 * File: problemRequests.ts
 * Description: problem相关接口的二次封装
 * Created: 2020-7-19 18:02
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request, {REQUEST_TYPES} from "./request";
import {Problem, ProblemLimitation, ProblemTestCase} from "../models/problem";
import {ProblemPaginationRequest} from "../models/pagination";
import {getTokenFromStorage} from "../utils/dataPersistence";


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
export const getProblems = (requestParams: ProblemPaginationRequest) => {
  return request.get(
    "/problem/get_problems",
    {
      method: REQUEST_TYPES.GET,
      params: requestParams
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

// 编辑problem基本信息
export const editProblemBasicInfo = (problem: Problem) => {
  return request.put(
    "/problem/edit_problem/" + problem.id,
    problem,
    {
      headers: {
        Authorization: getTokenFromStorage()
      }
    }
  )
}

// 编辑problem限制信息
export const editProblemLimitation = (problem: Problem) => {
  return request.put(
    "/problem/set_limitation/" + problem.id,
    problem,
    {
      headers: {
        Authorization: getTokenFromStorage()
      }
    }
  )
}

// 删除测试点记录
export const deleteTestCase = (testCaseId: number) => {
  return request.delete(
    "/problem/delete_solution/" + testCaseId,
    {
      headers: {
        Authorization: getTokenFromStorage()
      }
    }
  )
}

// 创建一个问题
export const createProblem = (name: string) => {
  return request.post(
    "/problem/create_problem",
    {
      name: name
    },
    {
      headers: {
        Authorization: getTokenFromStorage()
      },

    }
  )
}