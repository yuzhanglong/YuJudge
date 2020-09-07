/*
 * File: ScoreBoard.tsx
 * Description: 题目集的记分板
 * Created: 2020-08-11 13:12:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Card} from "antd";
import {RouteComponentProps} from "react-router-dom";
import {getProblemSetScoreBoard} from "../../../network/problemSetRequest";
import {ScoreBoardInfo} from "../../../models/submission";
import ScoreBoardTable from "../../../components/scoreBoardTable/ScoreBoardTable";
import style from "./scoreBoard.module.scss"
import {BaseResponse} from "../../../models/common";
import {PROBLEM_SET_FORBIDDEN} from "../../../config/code";
import {goToResult} from "../../../utils/route";
import {ResultPageParam} from "../../../common/enumerations";
import RcQueueAnim from "rc-queue-anim";

interface ScoreBoardProps {

}

const ScoreBoard: React.FunctionComponent<ScoreBoardProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;

  useEffect(() => {
    getScoreBoardInfo(params.problemSetId);
  }, [params.problemSetId]);

  // 记分板数据
  const [scoreBoardInfo, setScoreBoardInfo] = useState<ScoreBoardInfo>();

  // 获取记分板数据
  const getScoreBoardInfo = (problemSetId: number) => {
    getProblemSetScoreBoard(problemSetId)
      .then(res => {
        setScoreBoardInfo(res.data);
      })
      .catch((err: BaseResponse) => {
        if (err.code === PROBLEM_SET_FORBIDDEN) {
          goToResult(ResultPageParam.PROBLEM_SET_FORBIDDEN);
        } else {
          goToResult(ResultPageParam.NOT_FOUND);
        }
      })
  }

  return (
    <RcQueueAnim>
      <div className={style.score_board} key={"score_board"}>
        <div className={style.score_board_content}>
          <Card
            title={"记分板"}
            headStyle={{textAlign: "center"}}>
            <div className={style.score_board_body}>
              {
                scoreBoardInfo &&
                <ScoreBoardTable
                  scoreBoardItems={scoreBoardInfo.participants}
                  problemAmount={scoreBoardInfo.problemAmount}>
                </ScoreBoardTable>
              }
            </div>
          </Card>
        </div>
      </div>
    </RcQueueAnim>
  )
}

export default ScoreBoard;