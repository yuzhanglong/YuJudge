/*
 * File: ProblemSetTimeLine.tsx
 * Description: 题目集时间线组件
 * Created: 2020-9-5 12:49:41
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {getProblemSetTimeline} from "../../../../network/problemSetRequest";
import {Empty, message, Pagination, Tag, Timeline} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import style from "../problemSetCount.module.scss"
import {tenDecimalToTwentySixDecimal} from "../../../../utils/math";
import moment from "moment";
import {
  EMPTY_IMAGE,
  PAGE_BEGIN,
  TIME_LINE_IN_PROBLEM_SET_FORMAT
} from "../../../../config/config";
import {UsePaginationState} from "../../../../hooks/pagination";
import {TimelinePaginationRequest} from "../../../../models/pagination";
import {BaseResponse} from "../../../../models/common";
import {ProblemSetTimelineItem} from "../../../../models/problemSet";

interface ProblemSetTimeLineProps {
  problemSetId: number;
}

const ProblemSetTimeLine: React.FunctionComponent<ProblemSetTimeLineProps> = (props) => {
  const problemSetTimelinePagination = UsePaginationState<TimelinePaginationRequest>(PAGE_BEGIN - 1, getProblemSetTimeline);

  useEffect(() => {
    getTimeline(props.problemSetId, PAGE_BEGIN - 1);
    // eslint-disable-next-line
  }, [props.problemSetId]);

  // 获取时间线信息
  const getTimeline = (problemSetId: number, start: number) => {
    problemSetTimelinePagination
      .changeCurrentPage({
        start: start,
        count: 20,
        problemSetId: problemSetId
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
      })
  }

  // 前往问题
  const onProblemIndexClick = (problemId: number) => {
    window.reactRouter.push(`/common/problem_set/${props.problemSetId}/problem/${problemId}`)
  }


  // 渲染时间线
  const renderTimeline = () => {
    return problemSetTimelinePagination.items.map((res: ProblemSetTimelineItem, index) => {
      return (
        <Timeline.Item
          dot={
            <CheckCircleOutlined className={res.isFirstAc ? style.time_line_icon_first_ac : style.time_line_icon}/>
          }
          key={index}
          label={
            <div className={style.time_line_time}>
              {moment(res.acTime).format(TIME_LINE_IN_PROBLEM_SET_FORMAT)}
            </div>
          }>
          <div className={style.time_line_body}>
            <div className={style.time_line_description_head}>
              {res.creator.nickname}
              <div className={style.time_line_tags}>
                {res.isFirstAc && <Tag color="#108ee9">FIRST AC</Tag>}
                <Tag color="#52c41a">AC</Tag>
              </div>
            </div>
            <div className={style.time_line_description_content}>
              通过【<span className={style.time_line_description_link}
              onClick={() => onProblemIndexClick(res.problemId)}>
              {tenDecimalToTwentySixDecimal(res.problemIndex + 1)}
            </span>】题
            </div>
          </div>
        </Timeline.Item>
      )
    })
  }


  return (
    <div>
      <Timeline mode={"alternate"}>
        {problemSetTimelinePagination.items.length ? renderTimeline() : <Empty image={EMPTY_IMAGE}/>}
      </Timeline>
      <div className={style.time_line_pagination}>
        <Pagination
          showSizeChanger={false}
          onChange={(v) => getTimeline(props.problemSetId, v)}
          total={problemSetTimelinePagination.paginationInfo.total - problemSetTimelinePagination.paginationInfo.count}
          pageSize={problemSetTimelinePagination.paginationInfo.count}/>
      </div>
    </div>
  )
}

export default ProblemSetTimeLine;