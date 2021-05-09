/*
 * File: JudgeHostEditModal.tsx
 * Description: 判题机编辑、创建表单
 * Created: 2020-8-21 20:38:45
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { isUrlValidated } from '../../../../utils/regex'
import { JudgeHostRequest } from '../../../../models/judgeHost'
import { JUDGE_HOST_DEFAULT_URL_SCHEME } from '../../../../config/config'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface JudgeHostFormProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (data: JudgeHostRequest) => void;
}

const JudgeHostEditModal: React.FunctionComponent<JudgeHostFormProps> = (props) => {
  const [form] = Form.useForm()
  const [urlScheme, setUrlScheme] = useState<string>(JUDGE_HOST_DEFAULT_URL_SCHEME)
  // local
  const localContext = useContext(LocalContext)

  // 渲染Modal底部内容
  const renderFooter = () => {
    return (
      <div>
        <Button onClick={() => props.onCancel()}>
          {localContext.cancel}
        </Button>
        <Button
          type={'primary'}
          onClick={() => onFormConfirm()}>
          {localContext.confirm}
        </Button>
      </div>
    )
  }

  // url scheme选择器
  const urlSchemeSelector = (
    <Select defaultValue={urlScheme} onChange={(value: string) => setUrlScheme(value)}>
      <Select.Option value='http'>http://</Select.Option>
      <Select.Option value='https'>https://</Select.Option>
    </Select>
  )

  // 表单确认
  const onFormConfirm = () => {
    form.validateFields()
      .then((res: any) => {
        const tmp: JudgeHostRequest = {
          name: res.name,
          baseUrl: `${urlScheme}://${res.url}`,
          port: res.port
        }
        props.onConfirm(tmp)
      })
      .catch(() => {
      })
  }

  return (
    <Modal
      width={500}
      visible={props.visible}
      maskClosable={false}
      destroyOnClose
      onCancel={props.onCancel}
      title={'Judging machine information'} footer={renderFooter()}>
      <Form form={form}>
        <Form.Item label={'name'} name='name' rules={[{
          required: true,
          message: 'Please enter a name'
        }]}>
          <Input />
        </Form.Item>
        <Form.Item label={'address'} name='url' rules={[
          {
            required: true,
            message: 'please enter the address'
          },
          {
            message: 'Invalid address',
            validator: (rule, value) => {
              return isUrlValidated(`${urlScheme}://${value}`) ? Promise.resolve() : Promise.reject('无效的ip地址')
            }
          }
        ]}>
          <Input addonBefore={urlSchemeSelector} />
        </Form.Item>
        <Form.Item
          label={'port'}
          name='port'
          rules={[
            {
              required: true,
              message: 'Port must not be empty'
            },
            {
              message: 'Please enter the correct port, between 0 and 65536',
              type: 'number',
              max: 65535,
              min: 1
            }
          ]}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default JudgeHostEditModal
