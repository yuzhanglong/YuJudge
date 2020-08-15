/*
 * File: ScoreBoard.tsx
 * Description: 题目集的记分板
 * Created: 2020-08-11 13:12:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Card, message} from "antd";
import {RouteComponentProps} from "react-router-dom";
import {getProblemSetScoreBoard} from "../../network/problemSetRequest";
import {ScoreBoardInfo} from "../../models/submission";
import ScoreBoardTable from "../../components/scoreBoardTable/ScoreBoardTable";

interface ScoreBoardProps {

}

const ScoreBoard: React.FunctionComponent<ScoreBoardProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;

  useEffect(() => {
    getScoreBoardInfo();
  }, []);

  // 记分板数据
  const [scoreBoardInfo, setScoreBoardInfo] = useState<ScoreBoardInfo>({
      frozen: false,
      participants: [],
      problemAmount: 0
    }
  );

  // 获取记分板数据
  const getScoreBoardInfo = () => {
    getProblemSetScoreBoard(params.problemSetId)
      .then(res => {
        setScoreBoardInfo(res.data);
      })
      .catch(() => {
        message.error("记分板信息获取失败");
      })
  }

  return (
    <div className={"problem-set-home"}>
      <Card
        title={"记分板"}
        headStyle={{textAlign: "center"}}
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          minWidth: 1000
        }}>
        <ScoreBoardTable
          scoreBoardItems={scoreBoardInfo.participants}
          problemAmount={scoreBoardInfo.problemAmount}>
        </ScoreBoardTable>
      </Card>
    </div>
  )
}

export default ScoreBoard;