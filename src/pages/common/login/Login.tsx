/*
 * File: login.tsx
 * Description: 登录页面
 * Created: 2020-08-02 19:50:11
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import LoginForm from '../../../components/loginForm/LoginForm'
import { getCheckCodeInfo, getUserInfo, login, register } from '../../../network/userRequest'
import { CheckCodeData, LoginFormData, LoginResponseData, RegisterFormData } from '../../../models/user'
import { BaseResponse } from '../../../models/common'
import { Button, Card, Col, message, Row } from 'antd'
import { getTokenFromStorage, saveUserInfo, setToken } from '../../../utils/dataPersistence'
import RegisterForm from '../../../components/registerForm/RegisterForm'
import style from './loginPage.module.scss'
import { LocalContext } from '../../../components/localContext/LocalContext'

interface LoginProps {

}

const Login: React.FunctionComponent<LoginProps & RouteComponentProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  // 涉及的表单
  enum formType {
    LOGIN,
    REGISTER
  }

  // 验证码相关信息
  const [checkCodeInfo, setCheckCodeInfo] = useState<CheckCodeData>()
  // 活跃表单类型
  const [activeForm, setActiveForm] = useState<formType>(formType.LOGIN)


  useEffect(() => {
    if (isUserLogin()) {
      props.history.push('/common/home')
    } else {
      getCheckCode()
    }
    // eslint-disable-next-line
  }, [])

  // 检测用户是否已经登录
  const isUserLogin = (): boolean => {
    const token = getTokenFromStorage()
    // 在下个页面向服务器验证token的有效性，如果token无效则会返回
    return !!token
  }

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
        const loginResponse: LoginResponseData = res.data
        setToken(loginResponse.accessToken)
        return getUserInfo()
      })
      .then((res: BaseResponse) => {
        message.success(localContext.home.loginSuccess)
        saveUserInfo(res.data)
        props.history.replace('/common/home')
      })
      .catch((err: BaseResponse) => {
        message.error(err.message)
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
        message.success(localContext.home.registerSuccess)
        setTimeout(() => {
          setActiveForm(formType.LOGIN)
        }, 2000)
      })
      .catch((err: BaseResponse) => {
        message.error(err.message)
      })
  }

  // 获取验证码信息
  const getCheckCode = () => {
    getCheckCodeInfo().then(res => {
      const info: CheckCodeData = res.data
      setCheckCodeInfo(info)
    })
  }

  // 更新验证码
  const resetCheckCode = () => {
    getCheckCode()
  }

  // 用户点击了去注册（去注册），转到注册（登录）表单
  const showRegisterForm = () => {
    setActiveForm(activeForm === formType.REGISTER ? formType.LOGIN : formType.REGISTER)
    // 重置验证码
    resetCheckCode()
  }

  return (
    <div className={style.login_page}>
      <div className={style.login_page_mask}>
        <div className={style.login_card_wrap}>
          <Card bodyStyle={{ padding: 0 }} className={style.login_card}>
            <Row>
              <Col>
                <img
                  src={'http://cdn.yuzzl.top/blog/20210517230424.png'}
                  alt={'confirmation'}
                  className={style.login_page_image} />
              </Col>
              <Col>
                <div className={style.login_area}>
                  <div className={style.login_area_title}>
                    <div className={style.login_area_title_main}>
                      {activeForm === formType.LOGIN ? localContext.home.userLogin : localContext.home.userRegister}
                    </div>
                    <div>
                      <Button type={'link'} onClick={() => showRegisterForm()}>
                        {activeForm === formType.LOGIN ? localContext.home.askRegister : localContext.home.gotoLogin}
                      </Button>
                    </div>
                  </div>
                  <div>
                    {
                      activeForm === formType.LOGIN &&
                      <LoginForm
                        checkCode={checkCodeInfo?.image}
                        validateRequired onConfirm={onLogin}
                        onCheckCodeClick={resetCheckCode}
                        className={style.login_form}>
                      </LoginForm>
                    }
                    {
                      activeForm === formType.REGISTER &&
                      <RegisterForm
                        checkCode={checkCodeInfo?.image}
                        validateRequired onConfirm={onRegister}
                        onCheckCodeClick={resetCheckCode}
                        className={style.login_form}>
                      </RegisterForm>
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
