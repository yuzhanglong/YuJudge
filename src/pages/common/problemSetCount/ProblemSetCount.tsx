/*
 * File: ProblemSetCount.tsx
 * Description: 题目集统计页面
 * Created: 2020-8-20 16:23:03
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Card, message} from "antd";
import SubmissionCount from "../../../components/submissionCount/SubmissionCount";
import {SubmissionCountInfo} from "../../../models/submission";
import {countProblemSetSubmissionInfo} from "../../../network/problemSetRequest";
import {RouteComponentProps} from "react-router-dom";
import style from "./problemSetCount.module.scss"
import ProblemSetTimeLine from "./childCmp/ProblemSetTimeLine";
import {BaseResponse} from "../../../models/common";
import {goToResult} from "../../../utils/route";
import {ResultPageParam} from "../../../common/enumerations";

interface ProblemSetCountProps {

}

const ProblemSetCount: React.FunctionComponent<ProblemSetCountProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemSetId: number = params.problemSetId;

  const [problemSetSubmissionCounts, setProblemSetSubmissionCounts] = useState<SubmissionCountInfo[]>([]);

  useEffect(() => {
    getProblemSetSubmissionCounts(problemSetId);
  }, [problemSetId]);

  // 获取题目集提交状态
  const getProblemSetSubmissionCounts = (problemSetId: number) => {
    countProblemSetSubmissionInfo(problemSetId)
      .then(res => {
        setProblemSetSubmissionCounts(res.data.items);
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
        goToResult(ResultPageParam.PROBLEM_SET_FORBIDDEN);
      })
  }

  return (
    <div className={style.problem_set_count}>
      <div className={style.problem_set_count_content}>
        <Card
          title={"数据统计"}
          headStyle={{
            textAlign: "center"
          }}>
          <div className={style.problem_set_count_body}>
            <div style={{
              width: 1400
            }}>
              <Card title={"提交趋势"}>
                <SubmissionCount
                  showPicker={false}
                  submissionCounts={problemSetSubmissionCounts}/>
              </Card>
              <Card title={"时间轴"} style={{marginTop: 30}}>
                <ProblemSetTimeLine problemSetId={problemSetId}/>
              </Card>
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default ProblemSetCount;