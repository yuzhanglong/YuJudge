/*
 * File: problemRequests.ts
 * Description: problem相关接口的二次封装
 * Created: 2020-7-19 18:02
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import request from "./interceptor";
import {Problem, ProblemLimitation, ProblemTestCase} from "../models/problem";
import {ProblemPaginationRequest} from "../models/pagination";


// 通过id来获取problem的基本信息
export const getProblemById = (problemId: string) => {
  return request.get(
    "/problem/get_problem_by_id/" + problemId,
  )
}


// 分页获取多个problem
export const getProblems = (requestParams: ProblemPaginationRequest) => {
  return request.get(
    "/problem/get_problems",
    {
      params: requestParams
    }
  )
}


// 获取problem的详细信息
export const getProblemDetailedById = (problemId: number) => {
  return request.get(
    "/problem/get_problem_detailed_by_id/" + problemId,
    {
      headers: {
        loading: true
      }
    }
  )
}


// 获取problem的一个或多个解决方案
export function getSolutionByProblemId(problemId: number) {
  return request.get(
    "/problem/get_solutions/" + problemId
  )
}

// 设置限制
export const setLimitations = (problemId: number, limitation: ProblemLimitation) => {
  return request.post(
    "/problem/set_limitation/" + problemId,
    limitation
  )
}


// 添加解决方案
export const createSolution = (problemId: number, solution: ProblemTestCase) => {
  return request.put(
    "/problem/create_solution/" + problemId,
    solution
  )
}

// 获取近期problems
export const getRecentProblems = (size: number) => {
  return request.get(
    "/problem/get_recent_problem",
    {
      params: {
        size: size
      },
      headers: {
        loading: true
      }
    }
  )
}

// 编辑problem基本信息
export const editProblemBasicInfo = (problem: Problem) => {
  return request.put(
    "/problem/edit_problem/" + problem.id,
    problem
  )
}

// 编辑problem限制信息
export const editProblemLimitation = (problem: Problem) => {
  return request.put(
    "/problem/set_limitation/" + problem.id,
    problem
  )
}

// 删除测试点记录
export const deleteTestCase = (testCaseId: number) => {
  return request.delete(
    "/problem/delete_solution/" + testCaseId
  )
}

// 创建一个问题
export const createProblem = (name: string) => {
  return request.post(
    "/problem/create_problem",
    {
      name: name
    }
  )
}

// 获取用户已经ac题目的id集合
export const getUserAcProblemIds = (uid: number | null = null) => {
  return request.get(
    "/problem/user_ac_problem_ids",
    {
      params: {
        uid: uid
      }
    }
  )
}

// 获取用户尝试题目的id集合
export const getUserTriedProblemIds = (uid: number | null = null) => {
  return request.get(
    "/problem/user_tried_problem_ids",
    {
      params: {
        uid: uid
      }
    }
  )
}

// 删除题目
export const deleteProblem = (problemId: number) => {
  return request.delete(
    "/problem/problem/" + problemId
  )
}