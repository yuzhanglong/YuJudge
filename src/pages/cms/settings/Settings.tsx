/*
 * File: Settings.tsx
 * Description: 设置页面
 * Created: 2020-9-5 22:07:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card, Divider, Input, InputNumber, message, Slider} from "antd";
import EditorTip from "../../../components/editorTip/editorTip";
import style from "./settings.module.scss";
import {JUDGE_NUMBER_SETTINGS_RANGE} from "../../../config/config";
import {
  getSubmissionFrequencyControl,
  getSubmissionThreadPoolConfiguration, setSubmissionFrequencyControl,
  setSubmissionThreadPoolMaxSize
} from "../../../network/submissionRequest";
import {SubmissionThreadPoolConfiguration} from "../../../models/submission";
import RcQueueAnim from "rc-queue-anim";

interface SettingsProps {

}

const Settings: React.FunctionComponent<SettingsProps> = (props) => {

  // 提交线程池配置
  const [submissionThreadPoolConfig, setSubmissionThreadPoolConfig] = useState<SubmissionThreadPoolConfiguration>();

  // 最大提交量
  const [maxSubmissionSize, setMaxSubmissionSize] = useState<number>(0);

  // 提交间隔
  const [submissionFrequency, setSubmissionFrequency] = useState(0);

  useEffect(() => {
    getAndSetSubmissionThreadConfig();
    getSubmissionFrequency();
  }, []);

  // 获取提交线程池配置
  const getAndSetSubmissionThreadConfig = () => {
    getSubmissionThreadPoolConfiguration()
      .then(res => {
        const data: SubmissionThreadPoolConfiguration = res.data;
        setSubmissionThreadPoolConfig(data);
        setMaxSubmissionSize(data.maxPoolSize);
      })
  }

  // 获取提交间隔配置
  const getSubmissionFrequency = () => {
    getSubmissionFrequencyControl()
      .then(res => {
        setSubmissionFrequency(res.data);
      })
  }

  // 设置线程池配置
  const setSubmissionThreadPoolSize = (size: number) => {
    setSubmissionThreadPoolMaxSize(size)
      .then(() => {
        message.success("设置成功");
        getAndSetSubmissionThreadConfig();
      })
  }

  // 提交间隔配置输入框被改变
  const onSubmissionFrequencyInputChange = (event: any) => {
    event.persist();
    setSubmissionFrequency(event.target.value);
  }

  // 获取限制文案
  const getSubmissionFrequencyText = () => {
    const base = "用户两次提交的间隔时间(秒)，用来防止接口恶意调用、频繁提交";
    const current = submissionFrequency === 0 ? "无限制" : `${submissionFrequency}秒`
    return `${base} [当前状态: ${current}]`;
  }

  // 设置提交间隔
  const reSetSubmissionFrequencyControl = () => {
    setSubmissionFrequencyControl(submissionFrequency)
      .then(() => {
        message.success("设置成功~");
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
                  content={`同时运行的判题个数，可以根据实际配置进行修改 [当前个数: ${submissionThreadPoolConfig?.maxPoolSize || 0}]`}>
                  <Slider
                    tooltipVisible={true}
                    value={maxSubmissionSize}
                    className={style.cms_settings_slider}
                    max={JUDGE_NUMBER_SETTINGS_RANGE[1]}
                    min={JUDGE_NUMBER_SETTINGS_RANGE[0]}
                    onChange={(v: number) => setMaxSubmissionSize(v)}
                    onAfterChange={() => setSubmissionThreadPoolSize(maxSubmissionSize)}/>
                </EditorTip>
                <Divider/>
                <EditorTip
                  title={"设置提交间隔时间"}
                  content={getSubmissionFrequencyText()}>
                  <Input
                    onChange={(event) => onSubmissionFrequencyInputChange(event)}
                    className={style.cms_settings_frequency_input}
                    suffix={<Button type={"link"} onClick={() => reSetSubmissionFrequencyControl()}>确定</Button>}
                    value={submissionFrequency}/>

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