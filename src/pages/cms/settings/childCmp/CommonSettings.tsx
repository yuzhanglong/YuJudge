/*
 * File: CommonSettings.tsx
 * Description: 一般设置项目
 * Created: 2020-9-13 10:54:47
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react'
import style from '../settings.module.scss'
import EditorTip from '../../../../components/editorTip/editorTip'
import { Button, Card, Divider, Input, message, Slider } from 'antd'
import { JUDGE_NUMBER_SETTINGS_RANGE } from '../../../../config/config'
import { setSubmissionFrequencyControl, setSubmissionThreadPoolMaxSize } from '../../../../network/submissionRequest'
import { SubmissionThreadPoolConfiguration } from '../../../../models/submission'
import { languageChangeAction } from '../../../../store/action'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../../../../store/reducer'

interface CommonSettingsProps {
  submissionThreadPoolConfig?: SubmissionThreadPoolConfiguration;
  submissionFrequency: number;
  onThreadConfigChange: () => void;
  onSubmissionFrequencyChange: (f: number) => void;
  maxSubmissionSize: number;
  onSubmissionSizeChange: (size: number) => void;
}

const CommonSettings: React.FunctionComponent<CommonSettingsProps> = (props) => {
  const store = useStore()
  // @ts-ignore
  const language = useSelector(state => state.language)
  const dispatch = useDispatch()

  // 设置线程池配置
  const setSubmissionThreadPoolSize = (size: number) => {
    setSubmissionThreadPoolMaxSize(size)
      .then(() => {
        message.success('设置成功')
        props.onThreadConfigChange()
      })
  }

  // 提交间隔配置输入框被改变
  const onSubmissionFrequencyInputChange = (event: any) => {
    event.persist()
    props.onSubmissionFrequencyChange(event.target.value)
  }

  // 获取限制文案
  const getSubmissionFrequencyText = () => {
    const base = '用户两次提交的间隔时间(秒)，用来防止接口恶意调用、频繁提交'
    const current = props.submissionFrequency === 0 ? '无限制' : `${props.submissionFrequency}秒`
    return `${base} [当前状态: ${current}]`
  }

  // 设置提交间隔
  const reSetSubmissionFrequencyControl = () => {
    setSubmissionFrequencyControl(props.submissionFrequency)
      .then(() => {
        message.success('设置成功~')
      })
  }

  // 语言切换
  const onLanguageChange = () => {
    if (language === 'zh-CN') {
      dispatch(languageChangeAction('en-US'))
    } else {
      dispatch(languageChangeAction('zh-CN'))
    }
  }


  return (
    <Card
      title={<div className={style.cms_settings_edit_item_title}>一般项</div>}
      className={style.cms_settings_item}>
      <EditorTip
        title={'设置同时运行的判题个数'}
        content={`同时运行的判题个数，可以根据实际配置进行修改 [当前个数: ${props.submissionThreadPoolConfig?.maxPoolSize || 0}]`}>
        <Slider
          tooltipVisible={true}
          value={props.maxSubmissionSize}
          className={style.cms_settings_slider}
          max={JUDGE_NUMBER_SETTINGS_RANGE[1]}
          min={JUDGE_NUMBER_SETTINGS_RANGE[0]}
          onChange={(v: number) => props.onSubmissionSizeChange(v)}
          onAfterChange={() => setSubmissionThreadPoolSize(props.maxSubmissionSize)} />
      </EditorTip>
      <Divider />
      <EditorTip
        title={'设置提交间隔时间'}
        content={getSubmissionFrequencyText()}>
        <Input
          onChange={(event) => onSubmissionFrequencyInputChange(event)}
          className={style.cms_settings_frequency_input}
          suffix={<Button type={'link'} onClick={() => reSetSubmissionFrequencyControl()}>确定</Button>}
          value={props.submissionFrequency} />
      </EditorTip>
      <Divider />
      <EditorTip
        title={'设置语言'}
        content={`当前语言：${language}`}>
        <Button onClick={() => onLanguageChange()}>切换</Button>
      </EditorTip>
    </Card>
  )
}

export default CommonSettings
