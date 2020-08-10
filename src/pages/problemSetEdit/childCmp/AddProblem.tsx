/*
 * File: AddProblem.tsx
 * Description: 题目集编辑界面使用，用来添加problem的表单
 * Created: 11:05 上午
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import ProblemTable from "../../../components/problemTable/ProblemTable";
import {Problem} from "../../../models/problem";
import {Col, Modal, Row} from "antd";
import Search from "antd/es/input/Search";

interface AddProblemProps {
  problems: Problem[];
  isVisiable: boolean;
}

const AddProblem: React.FunctionComponent<AddProblemProps> = (props) => {

  // 搜索按钮被按下
  const onSearchButtonClick = (value: string) => {
    console.log(value);
  }

  return (
    <Modal
      visible={props.isVisiable}
      title={"添加问题到题目集"} width={1000}>
      <Row align={"middle"} justify={"space-between"}>
        <Col>
          <Search
            placeholder="问题关键词或id"
            onSearch={value => onSearchButtonClick(value)}
            style={{width: 200}}
          />
        </Col>
      </Row>
      <ProblemTable
        isShowCheckBoxGroup={true}
        problems={props.problems}
        isShowOperations={false}/>
    </Modal>
  )
}

AddProblem.defaultProps = {
  isVisiable: false
}

export default AddProblem;