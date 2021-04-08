/*
 * File: BasicInfoEditor.tsx
 * Description: 题目集基本信息编辑表单组件
 * Created: 2020-08-15 18:21:00
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Switch, Checkbox } from 'antd'
import { ProblemSet } from '../../../../models/problemSet'
import { getDateRangeMomentArray } from '../../../../utils/dateTime'
import { LanguageTypeEnum } from '../../../../common/enumerations'
import { PROGRAM_LANGUAGE_NAME } from '../../../../common/programLanguage'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface BasicInfoEditorProps {
  problemSet: ProblemSet;
  onEditConfirm: (value: ProblemSet) => void;
}

const BasicInfoEditor: React.FunctionComponent<BasicInfoEditorProps> = (props) => {

  const [activeLanguage, setActiveLanguage] = useState<string[]>([])

  const [form] = Form.useForm()

  const [open, setOpen] = useState<boolean>(true)

  // local
  const localContext = useContext(LocalContext)

  // 表单初始化
  useEffect(() => {
    setActiveLanguage(props.problemSet.allowedLanguage || [])
    form.setFieldsValue({
      name: props.problemSet.name,
      description: props.problemSet.description,
      open: props.problemSet.open,
      timeRange: getDateRangeMomentArray(
        props.problemSet.startTime || 0,
        props.problemSet.deadline || 0
      )
    })
  }, [form, props.problemSet])

  // 表单确认
  const onFormFinish = (data: ProblemSet) => {
    data.allowedLanguage = activeLanguage
    data.open = open
    props.onEditConfirm(data)
  }

  // 多选框选项
  const options = [
    { label: PROGRAM_LANGUAGE_NAME[LanguageTypeEnum.PYTHON], value: LanguageTypeEnum.PYTHON },
    { label: PROGRAM_LANGUAGE_NAME[LanguageTypeEnum.JAVA], value: LanguageTypeEnum.JAVA },
    { label: PROGRAM_LANGUAGE_NAME[LanguageTypeEnum.C_PLUS_PLUS], value: LanguageTypeEnum.C_PLUS_PLUS },
    { label: PROGRAM_LANGUAGE_NAME[LanguageTypeEnum.C], value: LanguageTypeEnum.C }
  ]

  return (
    <Form form={form} labelAlign={'left'} onFinish={(val: any) => onFormFinish(val)}>
      <Form.Item
        label={localContext.problem.name}
        name={'name'}>
        <Input />
      </Form.Item>
      <Form.Item
        label={localContext.problem.timeLimit}
        name={'timeRange'}>
        <DatePicker.RangePicker showTime />
      </Form.Item>
      <Form.Item
        label={localContext.problem.desc}
        name={'description'}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label={localContext.problem.isPublic}>
        <Switch checked={open} onChange={(v) => setOpen(v)} />
      </Form.Item>
      <Form.Item label={localContext.problem.languageSupport}>
        <Checkbox.Group
          options={options}
          value={activeLanguage}
          onChange={(v: any) => setActiveLanguage(v)} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          {localContext.save}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BasicInfoEditor
