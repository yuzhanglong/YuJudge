/*
 * File: ProblemSetManage.tsx
 * Description: 题目集管理
 * Created: 2020-8-31 20:34:04
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import {createProblemSet, getProblemSets} from "../../../network/problemSetRequest";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE} from "../../../config/config";
import {Card, message} from "antd";
import {ProblemSet} from "../../../models/problemSet";
import ProblemSetTable from "../../../components/problemSetTable/ProblemSetTable";
import ProblemSetToolBar from "./childCmp/ProblemSetToolBar";
import {RouteComponentProps} from "react-router-dom";
import {UsePaginationState} from "../../../hooks/pagination";
import {ProblemSetPaginationRequest} from "../../../models/pagination";
import {dateRangeMomentArrayToTimeStampArray} from "../../../utils/dateTime";
import style from "./problemSetManage.module.scss"


const ProblemSetManage: React.FunctionComponent<RouteComponentProps> = (props) => {

  // 是否只展示活跃的题目集
  const [isOnlyShowActiveProblemSets, setIsOnlyShowActiveProblemSets] = useState<boolean>(false);

  // 是否展示编辑表单
  const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false);

  // 搜索关键词
  const [searchValue, setSearchValue] = useState<string | null>(null);

  // 分页state
  const paginationState = UsePaginationState<ProblemSetPaginationRequest>(PAGE_BEGIN - 1, getProblemSets);

  useEffect(() => {
    getProblemSetsInfo(PAGE_BEGIN - 1, null, false);
    // eslint-disable-next-line
  }, []);


  // 获取题目集信息，其中的isLimit代表是否仅展示活跃的题目集
  const getProblemSetsInfo = (start: number, search: string | null, isLimit: boolean) => {
    const requestParams: ProblemSetPaginationRequest = {
      start: start,
      count: SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE,
      search: search,
      limit: isLimit
    }
    paginationState.changeCurrentPage(requestParams)
      .catch((err) => {
        message.error(err.message);
      });
  }

  // 用户点击只显示活跃题目集时
  const onProblemSetsLimitationChange = (checked: boolean) => {
    setIsOnlyShowActiveProblemSets(checked);
    getProblemSetsInfo(PAGE_BEGIN - 1, searchValue, checked);
  }

  // 创建题目集
  const onCreateProblemSet = (formData: any) => {
    const rangeTmp = dateRangeMomentArrayToTimeStampArray(formData.timeRange);
    const problemSet: ProblemSet = {
      name: formData.name,
      description: formData.description,
      startTime: rangeTmp[0].getTime(),
      deadline: rangeTmp[1].getTime(),
      open: true
    }

    createProblemSet(problemSet)
      .then(() => {
        message.success("创建题目集成功~");
        setIsShowEditForm(false);
        onPageChange(PAGE_BEGIN);
      })
      .catch(() => {
        message.error("创建失败");
      })
  }

  // 当页码发生改变
  const onPageChange = (page: number) => {
    getProblemSetsInfo(page - 1, searchValue, isOnlyShowActiveProblemSets);
  }

  // 关键字搜索
  const onSearchButtonClick = (value: string) => {
    setSearchValue(value);
    getProblemSetsInfo(0, value, false);
  }

  // 编辑题目集按钮被单击，我们准备执行跳转
  const onProblemEdit = (id: number) => {
    props.history.push(`/cms/problem_manage/problem_sets/edit/${id}`)
  }

  return (
    <Card title={"题目集管理"}>
      <div className={style.problem_set_tool_bar_wrap}>
        <ProblemSetToolBar
          onCheckBoxChange={onProblemSetsLimitationChange}
          showModal={isShowEditForm}
          onFormFinish={formData => onCreateProblemSet(formData)}
          onCreateButtonClick={() => setIsShowEditForm(true)}
          onCancel={() => setIsShowEditForm(false)}
          onSearch={onSearchButtonClick}/>
      </div>
      <ProblemSetTable
        onEditButtonClick={onProblemEdit}
        isLoading={paginationState.isLoading}
        problemSets={paginationState.items}
        totalPage={paginationState.paginationInfo.totalPage}
        onPageChange={onPageChange}/>
    </Card>
  )
}

export default ProblemSetManage;