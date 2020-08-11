/*
 * File: ScoreBoard.tsx
 * Description: 题目集的记分板
 * Created: 2020-08-11 13:12:21
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Card} from "antd";

interface ScoreBoardProps {

}

const ScoreBoard: React.FunctionComponent<ScoreBoardProps> = (props) => {
  return (
    <div className={"problem-set-home"}>
      <Card title={"记分板"} headStyle={{textAlign: "center"}}>

      </Card>
    </div>
  )
}

export default ScoreBoard;