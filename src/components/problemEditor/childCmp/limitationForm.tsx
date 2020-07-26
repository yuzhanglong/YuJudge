import React from "react";
import {Form, Input, Checkbox, Row, Col, Button} from "antd";
import {Problem} from "../../../models/problem";

interface LimitationFormProps {
  onConfirmed?: () => void;
  problem?: Problem;
}

const LimitationForm: React.FunctionComponent<LimitationFormProps> = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div className={"initial-form-wrap"}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="时间限制" name={"timeLimit"}>
          <Input placeholder="input placeholder"/>
        </Form.Item>
        <Form.Item label="内存限制" name={"memoryLimit"}>
          <Input placeholder="input placeholder"/>
        </Form.Item>
        <Form.Item label="输出限制" name={"outputLimit"}>
          <Input placeholder="input placeholder"/>
        </Form.Item>
        <Form.Item name="language" label="语言限制">
          <Checkbox.Group>
            <Row>
              <Col span={10}>
                <Checkbox value="C" style={{lineHeight: '32px'}}>
                  C
                </Checkbox>
              </Col>
              <Col span={10}>
                <Checkbox value="C++" style={{lineHeight: '32px'}}>
                  C++
                </Checkbox>
              </Col>
              <Col span={10}>
                <Checkbox value="JAVA" style={{lineHeight: '32px'}}>
                  JAVA
                </Checkbox>
              </Col>
              <Col span={10}>
                <Checkbox value="PYTHON" style={{lineHeight: '32px'}}>
                  PYTHON
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">更新上述限制</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LimitationForm;