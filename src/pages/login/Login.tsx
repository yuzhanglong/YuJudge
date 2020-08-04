/*
 * File: login.tsx
 * Description: 登录页面
 * Created: 2020-08-02 19:50:11
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import LoginForm from "../../components/loginForm/LoginForm";
import {getCheckCodeInfo, login} from "../../network/userRequest";
import {CheckCodeData, LoginFormData, LoginResponseData} from "../../models/user";
import {BaseResponse} from "../../models/common";
import {message} from "antd";
import {setToken} from "../../utils/dataPersistence";

interface LoginProps {

}

const Login: React.FunctionComponent<LoginProps & RouteComponentProps> = () => {

  // 验证码相关信息
  const [checkCodeInfo, setCheckCodeInfo] = useState<CheckCodeData>();


  useEffect(() => {
    getCheckCode();
  }, [])

  // 执行登录操作
  const onLogin = (value: any) => {
    let loginForm: LoginFormData = {
      nickname: value.nickname,
      password: value.password,
      checkCodeContent: value.checkCodeContent,
      checkCodeKey: checkCodeInfo ? checkCodeInfo.key : null
    }

    // 发送登录请求
    login(loginForm)
      .then((res) => {
        const loginResponse: LoginResponseData = res.data;
        setToken(loginResponse.accessToken);
        message.success("登录成功～");
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
      })
  }

  // 获取验证码信息
  const getCheckCode = () => {
    getCheckCodeInfo().then(res => {
      const info: CheckCodeData = res.data;
      setCheckCodeInfo(info);
    })
  }

  // 更新验证码
  const resetCheckCode = () => {
    getCheckCode();
  }

  return (
    <div className={"login-page"}>
      <div className={"login-page-image-wrap"}>
        <img
          src={"http://cdn.yuzzl.top/confirmation.svg"}
          alt={"confirmation"}
          className={"login-page-image"}/>
      </div>
      <div className={"login-page-login-area"}>
        <div className={"login-area-title"}>Login</div>
        <div className={"login-area-form"}>
          <LoginForm
            checkCode={checkCodeInfo?.image}
            validateRequired
            onConfirm={onLogin}
            onCheckCodeClick={resetCheckCode}>
          </LoginForm>
        </div>
      </div>

    </div>
  )
}

export default Login;