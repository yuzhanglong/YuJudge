import React, {useEffect, useState} from "react";
import {createProblemSet, getProblemSets} from "../../network/problemSetRequest";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE} from "../../config/config";
import {message} from "antd";
import {ProblemSet} from "../../models/problemSet";
import ProblemSetTable from "../../components/problemSetTable/ProblemSetTable";
import {Pagination} from "../../models/common";
import ProblemSetToolBar from "./childCmp/ProblemSetToolBar";
import {Moment} from 'moment';
import {RouteComponentProps} from "react-router-dom";
import {PaginationState} from "../../states/pagination";

const ProblemSetManage: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 当前展示的题目集
  const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);

  // 分页对象基本信息
  const [paginationInfo, setPaginationInfo] = useState<Pagination>();

  // 是否只展示活跃的题目集
  const [isOnlyShowActiveProblemSets, setIsOnlyShowActiveProblemSets] = useState<boolean>(false);

  // 是否等待状态中
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 是否展示编辑表单
  const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false);

  // 搜索关键词
  const [searchValue, setSearchValue] = useState<string | null>(null);


  useEffect(() => {
    getProblemSetsInfo(PAGE_BEGIN - 1, null, false);
  }, []);

  // 获取题目集信息，其中的isLimit代表是否仅展示活跃的题目集
  const getProblemSetsInfo = (start: number, search: string | null, isLimit: boolean) => {
    setIsLoading(true);
    getProblemSets(start, SINGLE_PAGE_SIZE_IN_PROBLEM_SET_MANAGE, search, isLimit)
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
    getProblemSetsInfo(PAGE_BEGIN - 1, searchValue, checked);
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
    <div>
      <div className={"problem-set-tool-bar-wrap"}>
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
        isLoading={isLoading}
        problemSets={problemSets}
        totalPage={paginationInfo?.totalPage}
        onPageChange={onPageChange}/>
    </div>
  )
}

export default ProblemSetManage;