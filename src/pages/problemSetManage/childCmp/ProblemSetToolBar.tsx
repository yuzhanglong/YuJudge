/*
 * File: ProblemSetToolBar.tsx
 * Description: 题目集表格上方的操作工具栏
 * Created: 2020-08-09 14:29:15
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button, Col, DatePicker, Form, Input, Modal, Row, Space, Switch} from "antd";

const {RangePicker} = DatePicker;

interface ProblemSetManageToolsProps {
  onSwitchChange?: (checked: boolean) => void;
  showModal?: boolean;
  onCreateButtonClick?: () => void;
  onCancel?: () => void;
  onFormFinish?: (formData: any) => void;
}

const ProblemSetToolBar: React.FunctionComponent<ProblemSetManageToolsProps> = (props) => {
  const [form] = Form.useForm();

  // 表单填写完成
  const onFormFinish = (e: any) => {
    if (props.onFormFinish) {
      props.onFormFinish(e);
    }
  }

  return (
    <div>
      <Row align={"middle"} justify={"space-between"}>
        <Col>
          <Space>
            只显示活跃题目集:
            <Switch
              defaultChecked={false}
              onChange={props.onSwitchChange}/>
          </Space>
        </Col>
        <Col>
          <Button type={"primary"} onClick={props.onCreateButtonClick}>
            创建题目集
          </Button>
        </Col>
      </Row>
      <Modal
        visible={props.showModal}
        title="创建题目集"
        onCancel={props.onCancel}
        footer={false}>
        <Form
          labelAlign={"left"}
          form={form}
          name="basic"
          labelCol={{
            span: 5
          }}
          onFinish={onFormFinish}>
          <Form.Item
            label="题目集名称"
            name="name"
            rules={[{required: true}]}>
            <Input/>
          </Form.Item>

          <Form.Item
            label="题目集描述"
            name="description"
            rules={[{required: true}]}>
            <Input.TextArea/>
          </Form.Item>
          <Form.Item
            label="设置期限"
            name="timeRange"
            rules={[{required: true}]}>
            <RangePicker showTime/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              创建
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

export default ProblemSetToolBar;