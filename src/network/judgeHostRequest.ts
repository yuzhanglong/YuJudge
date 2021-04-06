/*
 * File: judgeHostRequest.ts
 * Description: 判题服务器管理相关网络请求
 * Created: 2020-08-16 20:50:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import request from './interceptor';
import {JudgeHostRequest} from '../models/judgeHost';


// 获取所有的判题机信息
export const getJudgeHostsInfo = () => {
  return request.get(
    '/judge_host/get_judge_hosts_info'
  )
}


// 通过id获取某个判题机信息
export const getJudgeHostInfoById = (judgeHostId: number) => {
  return request.get(
    '/judge_host/get_judge_host_by_id/' + judgeHostId,
  )
}

// 获取某个判题机的统计信息
export const countJudgeHostSubmissionInfo = (timeBegin: string, timeEnd: string, judgeHostId: number) => {
  return request.get(
    '/judge_host/count_judge_host_submission',
    {
      params: {
        begin: timeBegin,
        end: timeEnd,
        judgeHostId: judgeHostId
      }
    }
  )
}

// 创建一个判题机
export const createJudgeHost = (requestBody: JudgeHostRequest) => {
  return request.put(
    '/judge_host/create_judge_host',
    {
      name: requestBody.name,
      baseUrl: requestBody.baseUrl,
      port: requestBody.port
    }
  )
}

// 开启/关闭判题机
export const resetJudgeHostCondition = (judgeHostId: number) => {
  return request.put(
    '/judge_host/reset_active_condition/' + judgeHostId,
    null,
    {
      headers: {
        loading: true
      }
    }
  )
}

// 移除判题机
export const deleteJudgeHost = (judgeHostId: number) => {
  return request.delete(
    '/judge_host/delete_judge_host/' + judgeHostId
  )
}

// 下载提交
export const downloadSubmissionFromJudgeHost = (judgeHostId: number, submissionIdInJudgeHost: number) => {
  return request.get(
    '/judge_host/submission',
    {
      params: {
        host: judgeHostId,
        submission: submissionIdInJudgeHost
      }
    }
  )
}