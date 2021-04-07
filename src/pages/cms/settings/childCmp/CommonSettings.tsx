/*
 * File: CommonSettings.tsx
 * Description: 一般设置项目
 * Created: 2020-9-13 10:54:47
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import style from '../settings.module.scss'
import EditorTip from '../../../../components/editorTip/editorTip'
import { Button, Card, Divider, Input, message, Slider } from 'antd'
import { JUDGE_NUMBER_SETTINGS_RANGE } from '../../../../config/config'
import { setSubmissionFrequencyControl, setSubmissionThreadPoolMaxSize } from '../../../../network/submissionRequest'
import { SubmissionThreadPoolConfiguration } from '../../../../models/submission'
import { languageChangeAction } from '../../../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../../../../store/reducer'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface CommonSettingsProps {
  submissionThreadPoolConfig?: SubmissionThreadPoolConfiguration;
  submissionFrequency: number;
  onThreadConfigChange: () => void;
  onSubmissionFrequencyChange: (f: number) => void;
  maxSubmissionSize: number;
  onSubmissionSizeChange: (size: number) => void;
}

const CommonSettings: React.FunctionComponent<CommonSettingsProps> = (props) => {
  const language = useSelector<AppStore>(state => state.language)
  const dispatch = useDispatch()
  // local
  const localContext = useContext(LocalContext)

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
    const base = localContext.settingPage.submissionFrequencyText
    const current = props.submissionFrequency === 0 ? `${localContext.unlimited}` : `${props.submissionFrequency}s`
    return `${base} [${localContext.current}: ${current}]`
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
      title={<div className={style.cms_settings_edit_item_title}>
        {localContext.settingPage.commonZoneTitle}
      </div>}
      className={style.cms_settings_item}>
      <EditorTip
        title={localContext.settingPage.setConcurrency}
        content={`${localContext.settingPage.setConcurrencyDesc} [${localContext.current}: ${props.submissionThreadPoolConfig?.maxPoolSize || 0}]`}>
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
        title={localContext.settingPage.setGapTime}
        content={getSubmissionFrequencyText()}>
        <Input
          onChange={(event) => onSubmissionFrequencyInputChange(event)}
          className={style.cms_settings_frequency_input}
          suffix={
            <Button type={'link'} onClick={() => reSetSubmissionFrequencyControl()}>
              {localContext.confirm}
            </Button>
          }
          value={props.submissionFrequency} />
      </EditorTip>
      <Divider />
      <EditorTip
        title={localContext.settingPage.setLanguage}
        content={`${localContext.current}：${localContext.localName}`}>
        <Button onClick={() => onLanguageChange()}>{localContext.switch}</Button>
      </EditorTip>
    </Card>
  )
}

export default CommonSettings
