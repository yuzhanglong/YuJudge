/*
 * File: Settings.tsx
 * Description: 设置页面
 * Created: 2020-9-5 22:07:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card, message, Slider} from "antd";
import EditorTip from "../../../components/editorTip/editorTip";
import style from "./settings.module.scss";
import {JUDGE_NUMBER_SETTINGS_RANGE} from "../../../config/config";
import {getSubmissionThreadPoolConfiguration, setSubmissionThreadPoolMaxSize} from "../../../network/submissionRequest";
import {SubmissionThreadPoolConfiguration} from "../../../models/submission";
import RcQueueAnim from "rc-queue-anim";

interface SettingsProps {

}

const Settings: React.FunctionComponent<SettingsProps> = (props) => {
  const [submissionThreadPoolConfig, setSubmissionThreadPoolConfig] = useState<SubmissionThreadPoolConfiguration>();
  const [maxSubmissionSize, setMaxSubmissionSize] = useState<number>(0);

  useEffect(() => {
    getAndSetSubmissionThreadConfig();
  }, []);

  const getAndSetSubmissionThreadConfig = () => {
    getSubmissionThreadPoolConfiguration()
      .then(res => {
        const data: SubmissionThreadPoolConfiguration = res.data;
        setSubmissionThreadPoolConfig(data);
        setMaxSubmissionSize(data.maxPoolSize);
      })
  }

  const setSubmissionThreadPoolSize = (size: number) => {
    setSubmissionThreadPoolMaxSize(size)
      .then(() => {
        message.success("设置成功");
        getAndSetSubmissionThreadConfig();
      })
  }

  return (
    <RcQueueAnim>
      <div key={"settings"}>
        <Card title={"系统设置"}>
          <RcQueueAnim>
            <div key={"common-settings"}>
              <Card
                title={<div className={style.cms_settings_edit_item_title}>一般项</div>}
                className={style.cms_settings_item}>
                <EditorTip
                  title={"设置同时运行的判题个数"}
                  content={`同时运行的判题个数，可以根据实际配置进行修改[当前个数: ${submissionThreadPoolConfig?.maxPoolSize || 0}]`}>
                  <Slider
                    tooltipVisible={true}
                    value={maxSubmissionSize}
                    className={style.cms_settings_slider}
                    max={JUDGE_NUMBER_SETTINGS_RANGE[1]}
                    min={JUDGE_NUMBER_SETTINGS_RANGE[0]}
                    onChange={(v: number) => setMaxSubmissionSize(v)}
                    onAfterChange={() => setSubmissionThreadPoolSize(maxSubmissionSize)}/>
                </EditorTip>
              </Card>
            </div>

            <div key={"danger-settings"}>
              <Card title={<div className={style.cms_settings_edit_item_title_danger}>危险项</div>}>
                <EditorTip
                  title={"关闭所有判题服务"}
                  content={"所有用户将无法提交代码至判题机"}>
                  <Button danger disabled>关闭</Button>
                </EditorTip>
              </Card>
            </div>
          </RcQueueAnim>
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default Settings;