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

  // 返回首页
  const goHome = () => {
    props.history.replace("/common/home");
  }

  return (
    <div className={style.basic_result}>
      <Result
        status="404"
        title="404"
        subTitle="找不到目标内容"
        extra={
          <Button type="primary" onClick={() => goHome()}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default BasicResult;