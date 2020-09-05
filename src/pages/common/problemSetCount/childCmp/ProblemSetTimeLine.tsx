/*
 * File: ProblemSetTimeLine.tsx
 * Description: 题目集时间线组件
 * Created: 2020-9-5 12:49:41
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {getProblemSetTimeline} from "../../../../network/problemSetRequest";
import {ProblemSetTimelineItem} from "../../../../models/problemSet";
import {Empty, message, Tag, Timeline} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import style from "../problemSetCount.module.scss"
import {tenDecimalToTwentySixDecimal} from "../../../../utils/math";
import moment from "moment";
import {EMPTY_IMAGE, TIME_LINE_IN_PROBLEM_SET_FORMAT} from "../../../../config/config";

interface ProblemSetTimeLineProps {
  problemSetId: number;
}

const ProblemSetTimeLine: React.FunctionComponent<ProblemSetTimeLineProps> = (props) => {
  const [problemSetTimelineItems, setProblemSetTimelineItems] = useState<ProblemSetTimelineItem[]>([]);

  useEffect(() => {
    getAndSetProblemSetTimeline(props.problemSetId);
  }, [props.problemSetId]);


  // 渲染时间线
  const renderTimeline = () => {
    return problemSetTimelineItems.map(res => {
      return (
        <Timeline.Item
          dot={<CheckCircleOutlined/>}
          key={res.acTime}
          label={
            <div className={style.time_line_time}>
              {moment(res.acTime).format(TIME_LINE_IN_PROBLEM_SET_FORMAT)}
            </div>

          }>
          <div className={style.time_line_body}>
            <div className={style.time_line_tags}>
              {res.isFirstAc && <Tag color="#108ee9">FIRST AC</Tag>}
              <Tag color="#52c41a">AC</Tag>
            </div>
            <div className={style.time_line_description}>
              <div className={style.time_line_description_creator}>
                {res.creator.nickname}
              </div>
              <div className={style.time_line_description_content}>
                通过【{tenDecimalToTwentySixDecimal(res.problemIndex + 1)}】题
              </div>
            </div>
          </div>
        </Timeline.Item>
      )
    })
  }


  // 获取时间线信息
  const getAndSetProblemSetTimeline = (problemSetId: number) => {
    getProblemSetTimeline(problemSetId)
      .then(res => {
        setProblemSetTimelineItems(res.data);
      })
      .catch(() => {
        message.error("获取时间线信息失败");
      });
  }

  return (
    <Timeline mode={"left"}>
      {problemSetTimelineItems.length ? renderTimeline() : <Empty image={EMPTY_IMAGE}/>}
    </Timeline>
  )
}

export default ProblemSetTimeLine;