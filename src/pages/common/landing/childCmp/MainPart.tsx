/*
 * File: MainPart.tsx
 * Description: 着陆页介绍区域，主要部分
 * Created: 2020-08-04 11:33:06
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button} from "antd";
import style from "../landing.module.scss"


interface MainPartProps {
  onMainButtonClick?: () => void;
  onSubButtonClick?: () => void;
  mainButtonText?: string;
  subButtonText?: string;
}

const MainPart: React.FunctionComponent<MainPartProps> = (props) => {
  return (
    <div className={style.main_part}>
      <div className={style.main_part_content_wrap}>
        <div className={style.main_part_left}>
          <h1 className={style.main_part_title}>
            Enjoy Coding And Get Happiness
          </h1>
          <p className={style.main_part_paragraph}>
            all work and no play makes jack a dull boy
          </p>
          <Button
            size="large"
            type="primary"
            className={style.main_part_button}
            onClick={() => props.onMainButtonClick ? props.onMainButtonClick() : null}>
            {props.mainButtonText}
          </Button>
          <Button
            size="large"
            className={style.main_part_button}
            onClick={() => props.onSubButtonClick ? props.onSubButtonClick() : null}>
            {props.subButtonText}
          </Button>
        </div>

        <div>
          <img
            alt={"codeTyping"}
            src={"http://cdn.yuzzl.top/codeTyping.svg"}
            className={style.main_part_illustration_image}/>
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