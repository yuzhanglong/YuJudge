/*
 * File: problemSetRequest.ts
 * Description: 题目集相关请求二次封装
 * Created: 2020-08-09 13:10:24
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import request, {REQUEST_TYPES} from "./request";
import {ProblemSet} from "../models/problemSet";
import {getToken} from "../utils/dataPersistence";
import {ProblemSetPaginationRequest, ProblemSetProblemPaginationRequest} from "../models/pagination";


// 获取题目集信息，其中的isLimit代表是否仅展示活跃的题目集
export const getProblemSets = (requestParams: ProblemSetPaginationRequest) => {
  return request.get(
    "/problem_set/get_problem_sets",
    {
      method: REQUEST_TYPES.GET,
      params: requestParams
    }
  )
}


// 创建一个problemSet
export const createProblemSet = (problemSet: ProblemSet) => {
  return request.post(
    "/problem_set/create_problem_set",
    problemSet,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
}

// 获取某个problemSet下所有problem
export const getProblemSetProblems = (requestParams: ProblemSetProblemPaginationRequest) => {
  return request.get(
    "/problem_set/get_problem_set_problems/" + requestParams.problemSetId,
    {
      headers: {
        Authorization: getToken()
      },
      params: requestParams
    }
  )
}


// 更新problemSetProblem
export const updateProblemSetProblems = (problemSetId: number, problems: number[]) => {
  return request.put(
    "/problem_set/update_problem_set_problem",
    {
      problems: problems,
      problemSetId: problemSetId
    }
  )
}

// 从题目集中移除某个题目
export const removeProblemFormProblemSet = (problemSetId: number, problemId: number) => {
  return request.delete(
    "/problem_set/remove_from_problem_set",
    {
      params: {
        problemSetId: problemSetId,
        problemId: problemId
      }
    }
  )
}