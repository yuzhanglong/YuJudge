/*
 * File: JudgeHostEditModal.tsx
 * Description: 判题机编辑、创建表单
 * Created: 2020-8-21 20:38:45
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Button, Form, Input, InputNumber, Modal} from "antd";
import {isIpAddress} from "../../../utils/regex";
import {JudgeHostRequest} from "../../../models/judgeHost";

interface JudgeHostFormProps {
  isVisiable: boolean;
  onCancel: () => void;
  onConfirm: (data: JudgeHostRequest) => void;
}

const JudgeHostEditModal: React.FunctionComponent<JudgeHostFormProps> = (props) => {
  const [form] = Form.useForm();

  // 渲染Modal底部内容
  const renderFooter = () => {
    return (
      <div>
        <Button onClick={() => props.onCancel()}>
          取消
        </Button>
        <Button
          type={"primary"}
          onClick={() => onFormConfirm()}>
          确定
        </Button>
      </div>
    )
  }

  // 表单确认
  const onFormConfirm = () => {
    form.validateFields()
      .then((res: any) => {
        const tmp: JudgeHostRequest = res;
        props.onConfirm(tmp);
      })
      .catch(() => {
      });
  }

  return (
    <Modal
      width={450}
      visible={props.isVisiable}
      maskClosable={false}
      destroyOnClose
      onCancel={props.onCancel}
      title={"判题机信息"} footer={renderFooter()}>
      <Form form={form}>
        <Form.Item label={"名称"} name="name" rules={[{
          required: true,
          message: "请输入名称"
        }]}>
          <Input/>
        </Form.Item>
        <Form.Item label={"地址"} name="address" rules={[
          {
            required: true,
            message: "请输入地址"
          },
          {
            message: "无效的ip地址",
            validator: (rule, value) => {
              return isIpAddress(value) ? Promise.resolve() : Promise.reject("无效的ip地址");
            }
          }
        ]}>
          <Input/>
        </Form.Item>
        <Form.Item
          label={"端口"}
          name="port"
          rules={[
            {
              required: true,
              message: "请输入端口",
            },
            {
              message: "请输入正确的端口, 介于0和65536之间",
              type: "number",
              max: 65535,
              min: 1
            }
          ]}>
          <InputNumber/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default JudgeHostEditModal;