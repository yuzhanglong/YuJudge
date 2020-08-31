/*
 * File: problemSetRequest.ts
 * Description: 题目集相关请求二次封装
 * Created: 2020-08-09 13:10:24
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import request from "./interceptor";
import {ProblemSet} from "../models/problemSet";
import {ProblemSetPaginationRequest, ProblemSetProblemPaginationRequest} from "../models/pagination";


// 获取题目集信息，其中的isLimit代表是否仅展示活跃的题目集
export const getProblemSets = (requestParams: ProblemSetPaginationRequest) => {
  return request.get(
    "/problem_set/get_problem_sets",
    {
      params: requestParams
    }
  )
}


// 创建一个problemSet
export const createProblemSet = (problemSet: ProblemSet) => {
  return request.post(
    "/problem_set/create_problem_set",
    problemSet
  )
}

// 获取某个problemSet下所有problem
export const getProblemSetProblems = (requestParams: ProblemSetProblemPaginationRequest) => {
  return request.get(
    "/problem_set/get_problem_set_problems",
    {
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


// 获取题目集信息
export const getProblemSetInfo = (problemSetId: number) => {
  return request.get(
    "/problem_set/get_problem_set/" + problemSetId,
  )
}

// 获取题目集记分板信息
export const getProblemSetScoreBoard = (problemSetId: number) => {
  return request.get(
    "/problem_set/get_score_board/" + problemSetId
  )
}

// 更新题目集的基本信息
export const updateProblemSetBasicInfo = (problemSet: ProblemSet) => {
  return request.put(
    "/problem_set/update_problem_set_basic_info/" + problemSet.id,
    problemSet
  )
}

// 获取某个题目集的统计信息
export const countProblemSetSubmissionInfo = (problemSetId: number) => {
  return request.get(
    "/problem_set/count_problem_set_submission",
    {
      params: {
        problemSetId: problemSetId
      }
    }
  )
}

// 获取某个题目集的统计信息
export const countProblemSetScatter = (problemSetId: number) => {
  return request.get(
    "/problem_set/get_scatter",
    {
      params: {
        problemSetId: problemSetId
      }
    }
  )
}