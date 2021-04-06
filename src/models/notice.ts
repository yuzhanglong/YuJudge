/*
 * File: notice.ts
 * Description: 公告相关业务模型
 * Created: 2020-8-26 12:02:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import {UserInfo} from './user';

export interface NoticeInfo {
  id: number;
  creator: UserInfo;
  priority: string;
  title: string;
  content: string;
  createTime: number;
}