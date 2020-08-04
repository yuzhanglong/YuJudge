/*
 * File: user.ts
 * Description: 用户相关业务模型
 * Created: 2020-08-04 19:01:47
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 验证码相关信息
export interface CheckCodeData {
  image: string;
  key: string;
}


// 登录表单
export interface LoginFormData {
  nickname: string;
  password: string;
  checkCodeContent: string;
  checkCodeKey: string | null;
}

// 登录返回
export interface LoginResponseData {
  accessToken: string;
  expiresIn: number;
}