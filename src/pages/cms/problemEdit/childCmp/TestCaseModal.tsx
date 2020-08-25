/*
 * File: TestCaseModal.tsx
 * Description: 测试方案表单处理的对话框
 * Created: 2020-08-05 18:35:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {Button, Form, Input, message, Modal, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons/lib";
import {DOWNLOAD_SERVER_BASE_URL, UPLOAD_SERVER_BASE_URL} from "../../../../config/config";
import {ProblemTestCase} from "../../../../models/problem";
import {UploadFile} from "antd/es/upload/interface";
import {createSolution} from "../../../../network/problemRequests";

interface TestCaseModalProps {
  isShow: boolean;
  onConfirmed: () => void;
  onCancel: () => void;
  uploadToken?: string;
  problemId: number;
  initalTestCase?: ProblemTestCase;

}

const TestCaseModal: React.FunctionComponent<TestCaseModalProps> = (props) => {

  enum UPLOADER {
    STD_IN,
    STD_OUT
  }

  const [form] = Form.useForm();

  useEffect(() => {
    if (props.initalTestCase) {
      form.setFieldsValue(props.initalTestCase);
    }
  }, [form, props.initalTestCase])


  // 构造上传表单
  const getUploadForm = (type: UPLOADER) => {
    const extensionName = (type === UPLOADER.STD_IN ? ".in" : ".out");
    return {
      token: props.uploadToken,
      key: new Date().getTime().toString() + extensionName
    }
  }

  // 确认按钮被单击
  const onConfirmed = () => {
    form.validateFields()
      .then(() => {
        submitSolutionFormData();
      });
  }

  // 提交表单
  const submitSolutionFormData = () => {
    const formData = form.getFieldsValue();
    const stdInFileData: UploadFile | undefined = formData.stdIn?.file;
    const stdOutFileData: UploadFile | undefined = formData.expectedStdOut?.file;

    const addSolutionForm: ProblemTestCase = {
      description: formData.description,
      expectedStdOut: getFinalFileDownloadPath(stdOutFileData?.response.key),
      stdIn: getFinalFileDownloadPath(stdInFileData?.response.key)
    }
    createSolution(props.problemId, addSolutionForm)
      .then(() => {
        message.success("创建成功～");
        props.onConfirmed();
      })
  }

  // 拼接下载路径
  const getFinalFileDownloadPath = (key: string) => {
    if (!key) {
      return null;
    }
    return `${DOWNLOAD_SERVER_BASE_URL}/${key}`;
  }

  // 上传组件表单验证器
  const uploadSuccessValidator = (data: any, validateMessage: string) => {
    if (data && data.fileList.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(validateMessage);
  }

  return (
    <div>
      <Modal
        destroyOnClose
        maskClosable={false}
        title="添加解决方案"
        visible={props.isShow}
        onCancel={() => props.onCancel()}
        onOk={() => onConfirmed()}>
        <Form
          name="basic"
          form={form}>
          <Form.Item
            label="样例描述"
            name="description"
            rules={[{
              required: true,
              message: '请填写样例描述'
            }]}>
            <Input/>
          </Form.Item>
          <Form.Item
            label="标准输入"
            name="stdIn"
            rules={[
              {
                required: true,
                message: '请上传标准输入',
                validator: (r, s) => uploadSuccessValidator(s, "请上传标准输入")
              }
            ]}>
            <Upload
              name="file"
              data={getUploadForm(UPLOADER.STD_IN)}
              action={UPLOAD_SERVER_BASE_URL}>
              <Button>
                <UploadOutlined/> 点我上传标准输入
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="期望输出"
            name="expectedStdOut"
            rules={[
              {
                required: true,
                message: '请上传期望输出',
                validator: (r, s) => uploadSuccessValidator(s, "请上传期望输出")
              }
            ]}>
            <Upload
              name="file"
              data={getUploadForm(UPLOADER.STD_OUT)}
              action={UPLOAD_SERVER_BASE_URL}>
              <Button>
                <UploadOutlined/> 点我上传期望输出
              </Button>
            </Upload>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}


TestCaseModal.defaultProps = {
  isShow: false,
  uploadToken: ""
}

export default TestCaseModal;