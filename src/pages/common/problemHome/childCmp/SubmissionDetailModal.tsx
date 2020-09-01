/*
 * File: SubmissionDetailModal.tsx
 * Description: 提交详情对话框
 * Created: 2020-8-25 22:41:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Modal, Descriptions, Input} from "antd";
import {SubmissionDetail} from "../../../../models/submissionInfo";
import ReactMarkdown from "react-markdown";
import {timestampToDateTime} from "../../../../utils/dateTime";
import ShowTestCase from "../../../../components/showTestCase/ShowTestCase";

interface SubmissionDetailModalProps {
  isVisible: boolean;
  onClose?: () => void;
  submission: SubmissionDetail;
  problemName: string;
}

const SubmissionDetailModal: React.FunctionComponent<SubmissionDetailModalProps> = (props) => {

  // 问题创建时间
  const renderCreateTime = (timeStamp: number | undefined) => {
    if (timeStamp === undefined) return;
    return (
      <div>
        {timestampToDateTime(timeStamp)}
      </div>
    )
  }

  // 渲染编译器输出内容
  const renderCompilerStdout = (submission: SubmissionDetail) => {
    // judgeResult不存在
    if (!submission.judgeResult) {
      return;
    }

    // 遍历编译器输出数组
    let compilerStdOut = "";

    // 没有输出，需要告知用户
    if (!submission.judgeResult.extraInfo.length) {
      compilerStdOut = "编译器没有输出O(∩_∩)O~";
    } else {
      const size = submission.judgeResult.extraInfo.length;
      for (let i = 0; i < size; i++) {
        const info = submission.judgeResult.extraInfo[i];
        i === size - 1 ? (compilerStdOut += info) : (compilerStdOut += info + "\n");
      }
    }

    return (
      <Input.TextArea
        value={compilerStdOut}
        style={{
          height: 100,
          backgroundColor: "#f5f5f5"
        }}>
      </Input.TextArea>
    )
  }


  return (
    <div className={"submission-detail-modal"}>
      <Modal
        destroyOnClose
        title="查看提交"
        visible={props.isVisible}
        onCancel={props.onClose}
        footer={null}
        width={950}>
        <Descriptions bordered column={2} size={"small"}>
          <Descriptions.Item label="提交时间" span={1}>
            {renderCreateTime(props.submission.createTime)}
          </Descriptions.Item>
          <Descriptions.Item label="判题状态" span={1}>
            {props.submission.judgeCondition}
          </Descriptions.Item>
          <Descriptions.Item label="判题偏好" span={1}>
            {props.submission.judgePreference}
          </Descriptions.Item>
          <Descriptions.Item label="时间消耗" span={1}>
            {props.submission.timeCost ? props.submission.timeCost : "--"} ms
          </Descriptions.Item>
          <Descriptions.Item label="内存消耗" span={1}>
            {props.submission.memoryCost ? props.submission.memoryCost : "--"} kb
          </Descriptions.Item>
          <Descriptions.Item label={"编译器"}
                             span={1}>
            {props.submission.language}
          </Descriptions.Item>
          <Descriptions.Item label={"判题机"}
                             span={2}>
            {props.submission.judgeHost?.name}
          </Descriptions.Item>
          <Descriptions.Item label={"测试点"}
                             span={2}>
            {props.submission.judgeResult.judgeResults &&
            <ShowTestCase testCases={props.submission.judgeResult.judgeResults}/>}
          </Descriptions.Item>
          <Descriptions.Item label={"用户代码"}
                             span={2}>
            <ReactMarkdown source={"```\n" + props.submission.codeContent + "\n```"}
                           className={"submission-detail-code"}>
            </ReactMarkdown>
          </Descriptions.Item>
          <Descriptions.Item label={"编译器输出"}
                             span={2}>
            <div className={"compiler-std-out-show"}>
              {renderCompilerStdout(props.submission)}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  )
}

SubmissionDetailModal.defaultProps = {
  isVisible: false,
  submission: {
    codeContent: "",
    judgePreference: "",
    language: "",
    problemId: 0,
    judgeResult: {
      extraInfo: [],
      judgeEndTime: 0,
      judgeResults: [],
      submissionId: 0
    }
  }
}

export default SubmissionDetailModal;