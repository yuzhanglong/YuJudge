/*
 * File: ProblemSets.tsx
 * Description: 题目集首页
 * Created: 2020-8-24 20:39:52
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import ProblemSetTable from "../../../components/problemSetTable/ProblemSetTable";
import {UsePaginationState} from "../../../hooks/pagination";
import {getProblemSets} from "../../../network/problemSetRequest";
import {PAGE_BEGIN} from "../../../config/config";
import {ProblemSetPaginationRequest} from "../../../models/pagination";
import {Card} from "antd";

interface ProblemSetsProps {

}

const ProblemSets: React.FunctionComponent<ProblemSetsProps> = (props) => {

  // 题目集分页State
  const problemSetsPaginationState = UsePaginationState<ProblemSetPaginationRequest>(PAGE_BEGIN - 1, getProblemSets);

  useEffect(() => {
    getAndSetProblemSetData();
    // eslint-disable-next-line
  }, []);

  const getAndSetProblemSetData = () => {
    problemSetsPaginationState
      .changeCurrentPage({
        count: 20,
        limit: false,
        search: null,
        start: 0
      })
      .catch((e) => {
        console.log(e);
      });
  }


  return (
    <div className={"problem-set-home"}>
      <Card
        title={"题目集"}
        headStyle={{
          textAlign: "center"
        }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <ProblemSetTable
            showOperations={false}
            problemSets={problemSetsPaginationState.items}
            isLoading={problemSetsPaginationState.isLoading}/>
        </div>
      </Card>

    </div>
  )
}

export default ProblemSets;