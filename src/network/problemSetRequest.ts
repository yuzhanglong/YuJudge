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


// 获取题目集信息，其中的isLimit代表是否仅展示活跃的题目集
export const getProblemSets = (start: number, count: number, search: string | null, limit: boolean) => {
  return request.get(
    "/problem_set/get_problem_sets",
    {
      method: REQUEST_TYPES.GET,
      params: {
        start: start,
        count: count,
        limit: limit,
        search: search
      }
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
export const getProblemSetProblems = (problemSetId: number) => {
  return request.get(
    "/problem_set/get_problem_set_problems/" + problemSetId,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
}