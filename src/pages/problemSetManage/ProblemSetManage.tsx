import React, {useEffect, useState} from "react";
import {createProblemSet, getProblemSets} from "../../network/problemSetRequest";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE} from "../../config/config";
import {message} from "antd";
import {ProblemSet} from "../../models/problemSet";
import ProblemSetTable from "../../components/problemSetTable/ProblemSetTable";
import {Pagination} from "../../models/common";
import ProblemSetToolBar from "./childCmp/ProblemSetToolBar";
import {Moment} from 'moment';

const ProblemSetManage: React.FunctionComponent = () => {
  const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<Pagination>();
  const [isOnlyShowActiveProblemSets, setIsOnlyShowActiveProblemSets] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false);

  useEffect(() => {
    getProblemSetsInfo(PAGE_BEGIN - 1, false);
  }, []);

  // 获取题目集信息，其中的isLimit代表是否仅展示活跃的题目集
  const getProblemSetsInfo = (start: number, isLimit: boolean) => {
    setIsLoading(true);
    getProblemSets(start, SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE, isLimit)
      .then((res) => {
        const pagination: Pagination = res.data;
        setProblemSets(pagination.items);
        setPaginationInfo(pagination);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        message.error("获取题目集信息失败");
      })
  }

  // 用户点击只显示活跃题目集时
  const onProblemSetsLimitationChange = (checked: boolean) => {
    setIsOnlyShowActiveProblemSets(checked);
    getProblemSetsInfo(PAGE_BEGIN - 1, checked);
  }

  // 创建题目集
  const onCreateProblemSet = (formData: any) => {
    const startTime: Moment = formData.timeRange[0];
    const endTime: Moment = formData.timeRange[1];

    const problemSet: ProblemSet = {
      name: formData.name,
      description: formData.description,
      startTime: startTime.toDate().getTime(),
      deadline: endTime.toDate().getTime()
    }

    createProblemSet(problemSet)
      .then(() => {
        message.success("创建题目集成功~");
      })
      .catch(() => {
        message.error("创建失败");
      })
  }

  // 当页码发生改变
  const onPageChange = (page: number) => {
    getProblemSetsInfo(page - 1, isOnlyShowActiveProblemSets);
  }

  return (
    <div>
      <div className={"problem-set-tool-bar-wrap"}>
        <ProblemSetToolBar
          onSwitchChange={onProblemSetsLimitationChange}
          showModal={isShowEditForm} onFormFinish={formData => onCreateProblemSet(formData)}
          onCreateButtonClick={() => setIsShowEditForm(true)}
          onCancel={() => setIsShowEditForm(false)}/>
      </div>
      <ProblemSetTable
        isLoading={isLoading}
        problemSets={problemSets}
        totalPage={paginationInfo?.totalPage} onPageChange={onPageChange}/>
    </div>
  )
}

export default ProblemSetManage;