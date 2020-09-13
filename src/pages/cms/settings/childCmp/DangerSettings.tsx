/*
 * File: DangerSettings.tsx
 * Description: 危险项设置
 * Created: 2020-9-13 11:08:30
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import style from "../settings.module.scss";
import EditorTip from "../../../../components/editorTip/editorTip";
import {Button, Card, Divider} from "antd";

interface DangerSettingsProps {
  isCheckCodeOpen: boolean;
  resetCheckCodeOpenCondition: () => void;
}

const DangerSettings: React.FunctionComponent<DangerSettingsProps> = (props) => {
  return (
    <Card title={<div className={style.cms_settings_edit_item_title_danger}>危险项</div>}>
      <EditorTip
        title={"开启/关闭验证码功能"}
        content={"如果关闭，网站的登录、注册验证码将失效"}>
        <Button danger onClick={() => props.resetCheckCodeOpenCondition()}>
          {props.isCheckCodeOpen ? "关闭" : "开启"}
        </Button>
      </EditorTip>
      <Divider/>
      <EditorTip
        title={"关闭所有判题服务"}
        content={"所有用户将无法提交代码至判题机"}>
        <Button danger disabled>关闭</Button>
      </EditorTip>
    </Card>
  )
}

export default DangerSettings;