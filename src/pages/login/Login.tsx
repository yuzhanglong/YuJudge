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
import {getCheckCodeInfo, getUserInfo, login, register} from "../../network/userRequest";
import {CheckCodeData, LoginFormData, LoginResponseData, RegisterFormData} from "../../models/user";
import {BaseResponse} from "../../models/common";
import {Button, Card, message} from "antd";
import {saveUserInfo, setToken} from "../../utils/dataPersistence";
import RegisterForm from "../../components/registerForm/RegisterForm";

interface LoginProps {

}

const Login: React.FunctionComponent<LoginProps & RouteComponentProps> = (props) => {

  // 涉及的表单
  enum formType {
    LOGIN,
    REGISTER
  }

  // 验证码相关信息
  const [checkCodeInfo, setCheckCodeInfo] = useState<CheckCodeData>();
  // 活跃表单类型
  const [activeForm, setActiveForm] = useState<formType>(formType.LOGIN);


  useEffect(() => {
    getCheckCode();
  }, []);

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
        return getUserInfo();
      })
      .then((res: BaseResponse) => {
        message.success("登录成功～");
        saveUserInfo(res.data);
        props.history.replace("/cms/dashboard");
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
      })
  }

  // 执行注册操作
  const onRegister = (value: any) => {
    let registerForm: RegisterFormData = {
      checkCodeContent: value.checkCodeContent,
      checkCodeKey: checkCodeInfo ? checkCodeInfo.key : null,
      nickname: value.nickname,
      password: value.password
    }
    register(registerForm)
      .then(() => {
        message.success("注册成功，2秒后自动前往登录页面");
        setTimeout(() => {
          setActiveForm(formType.LOGIN);
        }, 2000);
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

  // 用户点击了去注册（去注册），转到注册（登录）表单
  const showRegisterForm = () => {
    setActiveForm(activeForm === formType.REGISTER ? formType.LOGIN : formType.REGISTER);
    // 重置验证码
    resetCheckCode();
  }

  return (
    <div className={"login-page"}>
      <div className={"login"}>
        <div className={"login-page-image-wrap"}>
          <img
            src={"http://cdn.yuzzl.top/confirmation.svg"}
            alt={"confirmation"}
            className={"login-page-image"}/>
        </div>
        <div className={"login-page-login-area"}>
          <Card>
            <div className={"login-area-title"}>
              <div className={"login-area-title-main"}>
                {activeForm === formType.LOGIN ? "用户登录" : "用户注册"}
              </div>
              <div className={"register-link"}>
                <Button type={"link"} onClick={() => showRegisterForm()}>
                  {activeForm === formType.LOGIN ? "没有账号? 点我注册" : "去登录"}
                </Button>
              </div>
            </div>
            <div className={"login-area-form"}>
              {
                activeForm === formType.LOGIN &&
                <LoginForm
                  checkCode={checkCodeInfo?.image}
                  validateRequired onConfirm={onLogin}
                  onCheckCodeClick={resetCheckCode}
                  className={"login-form"}>
                </LoginForm>
              }
              {
                activeForm === formType.REGISTER &&
                <RegisterForm
                  checkCode={checkCodeInfo?.image}
                  validateRequired onConfirm={onRegister}
                  onCheckCodeClick={resetCheckCode}
                  className={"login-form"}>
                </RegisterForm>
              }
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login;