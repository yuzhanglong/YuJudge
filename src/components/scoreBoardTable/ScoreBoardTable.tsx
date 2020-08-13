/*
 * File: ScoreBoardTable.tsx
 * Description: 记分板表格组件
 * Created: 2020-08-13 10:24:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {ScoreBoardItem, ScoreBoardSolutionInfo} from "../../models/submission";
import {Table} from "antd";
import Column from "antd/lib/table/Column";
import {tenDecimalToTwentySixDecimal} from "../../utils/math";
import {UserInfo} from "../../models/user";
import classNames from "classnames";

interface ScoreBoardTableProps {
  scoreBoardItems: ScoreBoardItem[];
}

const ScoreBoardTable: React.FunctionComponent<ScoreBoardTableProps> = (props) => {

  // 获取问题数量
  const getProblemAmount = () => {
    if (props.scoreBoardItems) {
      return props.scoreBoardItems.length;
    }
    return 0;
  }

  const renderRowInfo = (value: ScoreBoardSolutionInfo, record: any, index: number) => {
    const cellClassnames = classNames("problem-cell", {
      "accept": value.isAccepted,
      "wrong-answer": !value.isAccepted && value.tryAmount > 0
    })
    return (
      <div key={index} className={cellClassnames}>
        {
          value.tryAmount > 0 &&
          <div>
            <div style={{
              fontWeight: "bold"
            }}>
              {66}
            </div>
            <div>
              {getTryAmount(value.tryAmount)}
            </div>
          </div>
        }
      </div>
    )
  }

  // 渲染尝试数目文字
  const getTryAmount = (amount: number) => {
    return amount + (amount > 1 ? "tries" : "try");
  }


  const renderColumns = () => {
    let res = [];
    for (let i = 0; i < getProblemAmount(); i++) {
      res.push(
        <Column
          key={i}
          title={tenDecimalToTwentySixDecimal(i + 1)}
          align={"center"}
          dataIndex={["solutionInfo", i]}
          render={renderRowInfo}
          width={50}/>
      );
    }
    return res;
  }

  const renderTeamInfo = (value: UserInfo) => {
    return <div>{value.nickname}</div>
  }

  const renderAcAmount = (value: number) => {
    return <div>{value}</div>
  }

  return (
    <div className={"score-board-table"}>
      {props.scoreBoardItems.length > 0 &&
      <Table
        bordered
        rowKey={"rank"}
        dataSource={props.scoreBoardItems}>
        <Column title={"排名"} dataIndex={"rank"} align={"center"} width={80}/>
        <Column title={"用户/队伍"} dataIndex={"teamInfo"} render={renderTeamInfo} align={"center"} width={160}/>
        <Column title={"AC"} dataIndex={"totalAcAmount"} render={renderAcAmount} align={"center"} width={50}/>
        {renderColumns()}
      </Table>}
    </div>
  )
}

ScoreBoardTable.defaultProps = {
  scoreBoardItems: []
}

export default ScoreBoardTable;