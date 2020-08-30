/*
 * File: RouteSelector.tsx
 * Description: 题目页面的选择器，用来跳转到提交页面或者是题解页面
 * Created: 2020/8/26
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Radio} from "antd";
import {ExperimentOutlined, FormOutlined, OrderedListOutlined} from "@ant-design/icons";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface RouteSelectorProps {
  onChange: (value: string) => void;
}

const RouteSelector: React.FunctionComponent<RouteSelectorProps & RouteComponentProps> = (props) => {

  const params: any = props.match.params;
  const problemId: number = params.problemId;
  const problemSetId: number = params.problemSetId;

  const onRadioChange = (event: any) => {
    props.onChange(event.target.value);
  }

  return (
    <Radio.Group onChange={onRadioChange}>
      <Radio.Button value="problem" onClick={() => {
        if (problemSetId) {
          props.history.push(`/common/problem_set/${problemSetId}/problem/${problemId}`);
        } else {
          props.history.push(`/common/problem/${problemId}`);
        }
      }}>
        <FormOutlined/>
        问题
      </Radio.Button>
      <Radio.Button
        value="submission"
        onClick={() => {
          if (problemSetId) {
            props.history.push(`/common/problem_set/${problemSetId}/problem/${problemId}/submission`);
          } else {
            props.history.push(`/common/problem/${problemId}/submission`);
          }
        }}>
        <OrderedListOutlined/>
        提交记录
      </Radio.Button>
      <Radio.Button
        value="solution"
        onClick={() => {
          if (problemSetId) {
            props.history.push(`/common/problem_set/${problemSetId}/problem/${problemId}/solution`);
          } else {
            props.history.push(`/common/problem/${problemId}/solution`);
          }
        }}>
        <ExperimentOutlined/>
        题解
      </Radio.Button>
    </Radio.Group>
  )
}

export default withRouter(RouteSelector);