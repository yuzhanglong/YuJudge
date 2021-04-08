/*
 * File: ProblemSetToolBar.tsx
 * Description: 题目集表格上方的操作工具栏
 * Created: 2020-08-09 14:29:15
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { LocalContext } from '../../../../components/localContext/LocalContext'

const { RangePicker } = DatePicker

interface ProblemSetManageToolsProps {
  onCheckBoxChange?: (checked: boolean) => void;
  showModal?: boolean;
  onCreateButtonClick?: () => void;
  onCancel?: () => void;
  onFormFinish?: (formData: any) => void;
  onSearch?: (search: string) => void;
}

const ProblemSetToolBar: React.FunctionComponent<ProblemSetManageToolsProps> = (props) => {
  const [form] = Form.useForm()

  // local
  const localContext = useContext(LocalContext)

  // 表单填写完成
  const onFormFinish = (e: any) => {
    if (props.onFormFinish) {
      props.onFormFinish(e)
    }
  }

  // 多选框改变
  const onCheckBoxChange = (e: any) => {
    if (props.onCheckBoxChange) {
      props.onCheckBoxChange(e.target.checked)
    }
  }

  // 搜索按钮被按下
  const onSearchButtonClick = (value: string) => {
    if (props.onSearch) {
      props.onSearch(value)
    }
  }

  return (
    <div>
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <Input.Search
            placeholder={localContext.problemSet.search}
            onSearch={value => onSearchButtonClick(value)}
            style={{ width: 200 }}
          />
          <Space style={{ paddingLeft: 20 }}>
            <Checkbox
              onChange={(e) => onCheckBoxChange(e)}
              defaultChecked={false}>
              {localContext.problemSet.onlyShowActive}
            </Checkbox>
          </Space>
        </Col>

        <Col>
          <Button
            type={'primary'}
            onClick={props.onCreateButtonClick}
            icon={<PlusOutlined />}>
            {localContext.problemSet.create}
          </Button>
        </Col>
      </Row>
      <Modal
        visible={props.showModal}
        title={localContext.problemSet.create}
        onCancel={props.onCancel}
        footer={false}>
        <Form
          labelAlign={'left'}
          form={form}
          name='basic'
          labelCol={{
            span: 5
          }}
          onFinish={onFormFinish}>
          <Form.Item
            label={localContext.problemSet.name}
            name='name'
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label={localContext.problemSet.desc}
            name='description'
            rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={localContext.problemSet.setDate}
            name='timeRange'
            rules={[{ required: true }]}>
            <RangePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {localContext.create}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

ProblemSetToolBar.defaultProps = {
  showModal: false
}

export default ProblemSetToolBar
