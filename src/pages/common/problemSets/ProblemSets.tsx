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
import RcQueueAnim from "rc-queue-anim";
import style from "./problemSets.module.scss"

interface ProblemSetsProps {

}

const ProblemSets: React.FunctionComponent<ProblemSetsProps> = () => {

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
      });
  }


  return (
    <RcQueueAnim>
      <div className={style.problem_sets} key={"problem-set-home"}>
        <div className={style.problems_content}>
          <Card
            title={"题目集"}
            headStyle={{textAlign: "center"}}>
            <div className={style.problems_body}>
              <ProblemSetTable
                allowTitleRoute
                showOperations={false}
                problemSets={problemSetsPaginationState.items}
                isLoading={problemSetsPaginationState.isLoading}/>
            </div>
          </Card>
        </div>
      </div>
    </RcQueueAnim>
  )
}

export default ProblemSets;
