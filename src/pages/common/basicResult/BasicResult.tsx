/*
 * File: basicResult.tsx
 * Description: 结果提示，例如404、403等，告知用户发生了错误/接下来该做什么
 * Created: 2020-8-30 22:49:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button, Result} from "antd";
import {RouteComponentProps} from "react-router-dom";
import style from "./basicResult.module.scss";

interface BasicResultProps {

}

const BasicResult: React.FunctionComponent<BasicResultProps & RouteComponentProps> = (props) => {

  const type: string = (props.match.params as any).type;
  console.log(type);

  // 返回首页
  const goHome = () => {
    props.history.replace("/common/home");
  }

  // 前往登录
  const gotoLogin = () => {
    props.history.replace("/login");
  }

  // 获取结果
  const getResult = () => {
    switch (type) {
      case "404":
        return cmp404;
      case "403":
        return cmp403;
      default:
        return cmp404;
    }
  }

  const cmp404 = (
    <Result
      status="404"
      title="404"
      subTitle="找不到目标内容"
      extra={<Button type="primary" onClick={() => goHome()}>返回首页</Button>}
    />
  )

  const cmp403 = (
    <Result
      status="403"
      title="403"
      subTitle="登录信息已过期或无权限"
      extra={<Button type="primary" onClick={() => gotoLogin()}>前往登录页</Button>}
    />
  )

  return (
    <div className={style.basic_result}>
      {getResult()}
    </div>
  )
}

export default BasicResult;