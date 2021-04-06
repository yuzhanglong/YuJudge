/*
 * File: MainPart.tsx
 * Description: 着陆页介绍区域，主要部分
 * Created: 2020-08-04 11:33:06
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {Button} from 'antd';
import style from '../landing.module.scss'
import {GithubOutlined} from '@ant-design/icons';
import mainPartImage from '../../../../assets/images/code-typing.svg'


interface MainPartProps {
  // 主按钮被单击
  onMainButtonClick?: () => void;
  // 次按钮被单击
  onSubButtonClick?: () => void;
  // 主按钮文案
  mainButtonText?: string;
  // 次按钮文案
  subButtonText?: string;
}

const MainPart: React.FunctionComponent<MainPartProps> = (props) => {

  // github被单击
  const onGithubClick = () => {
    window.open('https://github.com/yuzhanglong/YuJudge');
  }

  return (
    <div className={style.main_part}>
      <div className={style.main_part_content_wrap}>
        <div className={style.main_part_left}>
          <h1 className={style.main_part_title}>
            Enjoy Coding And Get Happiness
          </h1>
          <p className={style.main_part_paragraph}>
            Human life,
            <br/>
            like flood water and do not hear of islands and reefs,
            <br/>
            it is difficult to create beautiful waves.
          </p>
          <div className={style.main_part_button_groups}>
            <Button
              size="large"
              type="primary"
              style={{marginRight: 12}}
              className={style.main_part_button}
              onClick={() => props.onMainButtonClick ? props.onMainButtonClick() : null}>
              {props.mainButtonText}
            </Button>
            <Button
              size="large"
              className={style.main_part_button}
              style={{marginRight: 20}}
              onClick={() => props.onSubButtonClick ? props.onSubButtonClick() : null}>
              {props.subButtonText}
            </Button>
            <div className={style.main_part_button_github} onClick={() => onGithubClick()}>
              <GithubOutlined height={42}/>
            </div>
          </div>

        </div>
        <div>
          <img
            alt={'codeTyping'}
            src={mainPartImage}
            className={style.main_part_illustration_image}/>
        </div>
      </div>
    </div>
  )
}

MainPart.defaultProps = {
  mainButtonText: '注册',
  subButtonText: '登录'
}

export default MainPart;