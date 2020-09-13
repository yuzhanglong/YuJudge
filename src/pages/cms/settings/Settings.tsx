/*
 * File: Settings.tsx
 * Description: 设置页面
 * Created: 2020-9-5 22:07:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Card, message} from "antd";
import {
  getSubmissionFrequencyControl,
  getSubmissionThreadPoolConfiguration,
} from "../../../network/submissionRequest";
import {SubmissionThreadPoolConfiguration} from "../../../models/submission";
import RcQueueAnim from "rc-queue-anim";
import CommonSettings from "./childCmp/CommonSettings";
import DangerSettings from "./childCmp/DangerSettings";
import {changeCheckCodeCondition, getCheckCodeCondition} from "../../../network/common";

interface SettingsProps {

}

const Settings: React.FunctionComponent<SettingsProps> = () => {

  // 提交线程池配置
  const [submissionThreadPoolConfig, setSubmissionThreadPoolConfig] = useState<SubmissionThreadPoolConfiguration>();

  // 最大提交量
  const [maxSubmissionSize, setMaxSubmissionSize] = useState<number>(0);

  // 提交间隔
  const [submissionFrequency, setSubmissionFrequency] = useState(0);

  // 验证码需求
  const [isCheckCodeRequired, setIsCheckCodeRequired] = useState<boolean>(false);


  useEffect(() => {
    getAndSetSubmissionThreadConfig();
    getSubmissionFrequency();
    getCheckCodeRequire();
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

  // 验证码状态修改
  const onCheckCodeConditionChange = () => {
    setIsCheckCodeRequired(!isCheckCodeRequired);
    changeCheckCodeCondition()
      .then(() => {
        message.success("修改成功");
      })
  }

  // 获取验证码限制
  const getCheckCodeRequire = () => {
    getCheckCodeCondition()
      .then(res => {
        setIsCheckCodeRequired(res.data);
      })
  }

  return (
    <RcQueueAnim>
      <div key={"settings"}>
        <Card title={"系统设置"}>
          <RcQueueAnim>
            <div key={"common-settings"}>
              <CommonSettings
                submissionThreadPoolConfig={submissionThreadPoolConfig}
                submissionFrequency={submissionFrequency}
                onThreadConfigChange={() => getAndSetSubmissionThreadConfig()}
                onSubmissionFrequencyChange={(v) => setSubmissionFrequency(v)}
                maxSubmissionSize={maxSubmissionSize}
                onSubmissionSizeChange={(v) => setMaxSubmissionSize(v)}/>
            </div>
            <div key={"danger-settings"}>
              <DangerSettings
                isCheckCodeOpen={isCheckCodeRequired}
                resetCheckCodeOpenCondition={() => onCheckCodeConditionChange()}/>
            </div>
          </RcQueueAnim>
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default Settings;