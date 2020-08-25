/*
 * File: MainPart.tsx
 * Description: 着陆页介绍区域，主要部分
 * Created: 2020-08-04 11:33:06
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button} from "antd";

interface MainPartProps {
  onMainButtonClick?: () => void;
  onSubButtonClick?: () => void;
  mainButtonText?: string;
  subButtonText?: string;
}

const MainPart: React.FunctionComponent<MainPartProps> = (props) => {
  return (
    <div className={"main-part"}>
      <div className={"main-part-content-wrap"}>
        <div className={"main-part-left"}>
          <h1 className="main-part-title">
            Enjoy Coding And Get Happiness
          </h1>
          <p className="main-part-paragraph">
            all work and no play makes jack a dull boy
            all work and no play makes jack a dull boy
            all work and no play makes jack a dull boy
            all work and no play makes jack a dull boy
          </p>
          <Button
            size="large"
            type="primary"
            className={"main-part-button register"}
            onClick={() => props.onMainButtonClick ? props.onMainButtonClick() : null}>
            {props.mainButtonText}
          </Button>
          <Button
            size="large"
            className={"main-part-button"}
            onClick={() => props.onSubButtonClick ? props.onSubButtonClick() : null}>
            {props.subButtonText}
          </Button>
        </div>
        <div className={"main-part-illustration"}>
          <img alt={"codeTyping"} src={"http://cdn.yuzzl.top/codeTyping.svg"}
               className={"main-part-illustration-image"}/>
        </div>
      </div>
    </div>
  )
}

MainPart.defaultProps = {
  mainButtonText: "注册",
  subButtonText: "登录"
}

export default MainPart;