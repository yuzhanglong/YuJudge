import React from "react";
import {Form, Button, Input} from "antd";

const LimitationForm: React.FunctionComponent = () => {
  return (
    <Form>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder"/>
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default LimitationForm;