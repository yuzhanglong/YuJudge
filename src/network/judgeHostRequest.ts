/*
 * File: judgeHostRequest.ts
 * Description: 判题服务器管理相关网络请求
 * Created: 2020-08-16 20:50:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

// 获取题目集信息
import request from "./request";
import {getToken} from "../utils/dataPersistence";

export const getJudgeHostsInfo = () => {
  return request.get(
    "/judge_host/get_judge_hosts_info",
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
}