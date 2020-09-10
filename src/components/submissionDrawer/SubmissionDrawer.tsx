/*
 * File: SubmissionDrawer.tsx
 * Description: 提交抽屉
 * Created: 2020-9-8 19:42:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Col, Divider, Drawer, message, Row, Select} from "antd";
import {ScoreBoardSolutionInfo, SubmissionDetail} from "../../models/submission";
import {changeSubmissionCondition, getSubmissionById} from "../../network/submissionRequest";
import DescriptionItem from "../descriptionItem/DescriptionItem";
import style from "./submissionDrawer.module.scss";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT, JUDGE_RESULT_CHANGE_ALLOW_DATA} from "../../config/config";
import EditorTip from "../editorTip/editorTip";
import TestCaseList from "../testCaseList/TestCaseList";
import {JUDGE_CONDITION_COLORS, JUDGE_CONDITION_TAG_NAMES_CHINESE} from "../../common/judgeCondition";

interface SubmissionDrawerProps {
  visible: boolean;
  onClose: () => void;
  activeCell?: ScoreBoardSolutionInfo;
  onChangeSuccess: () => void;
}

const SubmissionDrawer: React.FunctionComponent<SubmissionDrawerProps> = (props) => {

  // 提交细节内容
  const [submissionDetail, setSubmissionDetail] = useState<SubmissionDetail>();

  // 操作窗口
  const [showOperationModal, setShowOperationModal] = useState<boolean>(false);

  // 活跃的判题结果
  const [activeJudgeCondition, setActiveJudgeCondition] = useState<string>();

  useEffect(() => {
    if (props.activeCell?.submissionId) {
      getSubmissionById(props.activeCell.submissionId)
        .then(res => {
          const detail: SubmissionDetail = res.data;
          setSubmissionDetail(detail);
          setActiveJudgeCondition(detail.judgeCondition)
        })
    }
  }, [props.activeCell]);

  // 渲染选择器
  const renderJudgeResultSelector = () => {
    return JUDGE_RESULT_CHANGE_ALLOW_DATA.map(res => {
      return (
        <Select.Option
          key={res}
          value={res}>
          {`${res}--(${JUDGE_CONDITION_TAG_NAMES_CHINESE[res]})`}
        </Select.Option>
      )
    })
  }

  // 修改判题结果
  const resetCondition = () => {
    if (submissionDetail && activeJudgeCondition && submissionDetail.id) {
      changeSubmissionCondition(submissionDetail.id, activeJudgeCondition)
        .then(() => {
          message.success("修改成功~");
          props.onClose();
          setShowOperationModal(false);
          props.onChangeSuccess();
        })
    }
  }


  return (
    <div>
      {
        props.activeCell && submissionDetail &&
        <Drawer
          width={640}
          visible={props.visible}
          title={`提交 #${props.activeCell.submissionId}`}
          closable={false}
          onClose={() => props.onClose()}>
          <p className={style.drawer_item_title}>
            提交信息
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="结果"
                content={
                  <div className={style.judge_condition_name}>
                    <div
                      style={{color: submissionDetail.judgeCondition ? JUDGE_CONDITION_COLORS[submissionDetail.judgeCondition] : undefined}}>
                      {submissionDetail.judgeCondition}
                    </div>
                  </div>
                }
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="语言"
                content={submissionDetail.language}/>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="提交时间"
                content={moment(submissionDetail.createTime).format(DEFAULT_DATE_TIME_FORMAT)}/>
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="评测机"
                content={`${submissionDetail.judgeHost?.name}`}/>
            </Col>
          </Row>
          <Divider/>
          <p className={style.drawer_item_title}>测试点</p>
          <TestCaseList testCases={submissionDetail.judgeResult.judgeResults}/>
          <Divider/>
          <p className={style.drawer_item_title}>
            操作
          </p>
          <EditorTip title={"修改判题结果"} content={"管理员可以修改本次判题结果，请谨慎处理"}>
            <Button danger onClick={() => setShowOperationModal(true)}>
              修改
            </Button>
          </EditorTip>
          <Drawer
            width={500}
            visible={showOperationModal}
            title={"修改判题结果"}
            closable={false}
            onClose={() => setShowOperationModal(false)}>
            <div className={style.judge_condition_old}>
              原结果: {JUDGE_CONDITION_TAG_NAMES_CHINESE[submissionDetail.judgeCondition || ""]}
            </div>
            <div className={style.judge_condition_old}>
              修改为: <Select
              className={style.judge_condition_selector} value={activeJudgeCondition}
              onChange={(val: string) => setActiveJudgeCondition(val)}>
              {renderJudgeResultSelector()}
            </Select>
            </div>
            <div>
              <Button type={"primary"} onClick={() => resetCondition()}>
                确定
              </Button>
            </div>
          </Drawer>
        </Drawer>
      }
    </div>
  )
}

export default SubmissionDrawer;