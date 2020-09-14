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
import style from "../problemHome.module.scss";

interface RouteSelectorProps {

}

const RouteSelector: React.FunctionComponent<RouteSelectorProps & RouteComponentProps> = (props) => {

  const params: any = props.match.params;
  const problemId: number = params.problemId;
  const problemSetId: number = params.problemSetId;

  // 活跃的标签
  const getActiveValue = () => {
    if (props.location.pathname.includes("submission")) {
      return "submission";
    }
    if (props.location.pathname.includes("solution")) {
      return "solution";
    }
    return "problem";
  }

  return (
    <Radio.Group value={getActiveValue()}>
      <Radio.Button value="problem" onClick={() => {
        if (problemSetId) {
          props.history.push(`/common/problem_set/${problemSetId}/problem/${problemId}`);
        } else {
          props.history.push(`/common/problem/${problemId}`);
        }
      }}>
        <FormOutlined className={style.problem_home_content_route_selector_icon}/>
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
        <OrderedListOutlined className={style.problem_home_content_route_selector_icon}/>
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
        <ExperimentOutlined className={style.problem_home_content_route_selector_icon}/>
        题解
      </Radio.Button>
    </Radio.Group>
  )
}

export default withRouter(RouteSelector);