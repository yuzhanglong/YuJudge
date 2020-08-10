/*
 * File: AddProblem.tsx
 * Description: 题目集编辑界面使用，用来添加problem的表单
 * Created: 11:05 上午
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useState} from "react";
import ProblemTable from "../../../components/problemTable/ProblemTable";
import {Problem} from "../../../models/problem";
import {Button, Col, message, Modal, Row} from "antd";
import Search from "antd/es/input/Search";
import {updateProblemSetProblems} from "../../../network/problemSetRequest";

interface AddProblemProps {
  problems: Problem[];
  isVisiable: boolean;
  totalPage: number | undefined;
  onProblemPageChange: (page: number) => void;
  onSearchConfirm?: (val: string) => void;
  onCancel: () => void;
  problemSetId: number;
}

const AddProblem: React.FunctionComponent<AddProblemProps> = (props) => {
  // 选中的行
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);


  // 搜索按钮被按下
  const onSearchButtonClick = (value: string) => {
    if (props.onSearchConfirm) {
      props.onSearchConfirm(value);
    }
  }

  // 添加确认
  const onAddConfirm = () => {
    updateProblemSetProblems(props.problemSetId, selectedRowIds)
      .then(() => {
        message.success("添加成功");
        window.location.reload();
      })
      .catch(() => {
        //TODO: 错误处理
      })
  }

  // 当页码改变时
  const onPaginationChange = (val: number) => {
    setSelectedRowIds([]);
    props.onProblemPageChange(val);
  }

  return (
    <Modal
      visible={props.isVisiable}
      title={"添加问题到题目集"}
      width={1000}
      footer={false}
      onCancel={props.onCancel}>
      <Row
        align={"middle"}
        justify={"space-between"}
        style={{marginBottom: 18}}>
        <Col>
          <Search
            placeholder="问题关键词或id"
            onSearch={value => onSearchButtonClick(value)}
            style={{width: 200}}
          />
        </Col>
        <Col>
          <Button
            type={"primary"}
            onClick={() => onAddConfirm()}>
            添加选中项至题目集
          </Button>
        </Col>
      </Row>
      <ProblemTable
        onSelectionSelected={(val) => setSelectedRowIds(val)}
        tableSize={"middle"}
        onPageChange={onPaginationChange}
        totalPage={props.totalPage}
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