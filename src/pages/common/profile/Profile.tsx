/*
 * File: Profile.tsx
 * Description: 个人中心首页
 * Created: 2020-8-24 14:03:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext, useEffect, useState } from 'react'
import { Col, message, Row } from 'antd'
import UserCard from '../../../components/userCard/UserCard'
import style from './profile.module.scss'
import ProfileCount from './childCmp/ProfileCount'
import { UserJudgeResultCount, UserSubmissionCount } from '../../../models/submission'
import moment from 'moment'
import { DEFAULT_DATE_TIME_FORMAT, RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT } from '../../../config/config'
import { getRecentSubmission, getUserJudgeResultCount } from '../../../network/submissionRequest'
import RcQueueAnim from 'rc-queue-anim'
import { getUserAcProblemIds, getUserTriedProblemIds } from '../../../network/problemRequests'
import { ProblemCountItem } from '../../../models/problem'
import { RouteComponentProps } from 'react-router-dom'
import { BaseResponse } from '../../../models/common'
import { USER_NOT_EXIST } from '../../../config/code'
import { getUserInfo } from '../../../network/userRequest'
import { UserInfo } from '../../../models/user'
import { LocalContext } from '../../../components/localContext/LocalContext'

interface profileProps {

}

const Profile: React.FunctionComponent<profileProps & RouteComponentProps> = (props) => {
  const uid = (props.match.params as any).userId === 'me' ? null : (props.match.params as any).userId

  // local
  const localContext = useContext(LocalContext)

  // 用户提交统计
  const [userJudgeResultCount, setUserJudgeResultCount] = useState<UserJudgeResultCount[]>([])

  // 近期提交统计
  const [recentSubmissionCount, setRecentSubmissionCount] = useState<UserSubmissionCount[]>([])

  // 用户ac
  const [acCount, setAcCount] = useState<ProblemCountItem[]>([])

  // 用户尝试
  const [triedCount, setTriedCount] = useState<ProblemCountItem[]>([])

  // 当前用户
  const [currentUser, setCurrentUser] = useState<UserInfo>()

  useEffect(() => {
    getAndSetRecentSubmissionCount(uid)
    getUserJudgeResults(uid)
    getAndSetUserAcProblem(uid)
    getAndSetUserTriedProblem(uid)
    getAndSetUserInfo(uid)
    // eslint-disable-next-line
  }, [uid])

  // 获取最近提交统计信息
  const getAndSetRecentSubmissionCount = (uid: number | null) => {
    const end = moment().add(1, 'days').format(DEFAULT_DATE_TIME_FORMAT)
    // 默认提早七天
    const start = moment().add(
      RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT * (-1),
      'days').format(DEFAULT_DATE_TIME_FORMAT)

    getRecentSubmission(start, end, uid)
      .then(res => {
        setRecentSubmissionCount(res.data)
      })
  }

  // 获取判题结果统计信息
  const getUserJudgeResults = (userId: number | null) => {
    getUserJudgeResultCount(userId)
      .then(res => {
        setUserJudgeResultCount(res.data)
      })
  }

  // 获取用户ac题目
  const getAndSetUserAcProblem = (uid: number | null) => {
    getUserAcProblemIds(uid)
      .then(res => {
        setAcCount(res.data)
      })
      .catch((err: BaseResponse) => {
        if (err.code === USER_NOT_EXIST) {
          message.error(err.message)
          props.history.replace('/result/404')
        }
      })
  }

  // 获取用户ac题目
  const getAndSetUserTriedProblem = (uid: number | null) => {
    getUserTriedProblemIds(uid)
      .then(res => {
        setTriedCount(res.data)
      })
  }

  // 获取用户信息
  const getAndSetUserInfo = (uid: number | null) => {
    getUserInfo(uid)
      .then(res => {
        setCurrentUser(res.data)
      })
  }

  return (
    <RcQueueAnim>
      <div title={localContext.profile.userHome} className={style.profile} key={'profile'}>
        <Row>
          <Col className={style.profile_user_info}>
            {currentUser && <UserCard userInfo={currentUser} />}
          </Col>
          <Col>
            <div key={'ProfileCount'}>
              <ProfileCount
                acCount={acCount}
                triedCount={triedCount}
                recentSubmission={recentSubmissionCount}
                userJudgeResultCount={userJudgeResultCount} />
            </div>
          </Col>
        </Row>
      </div>
    </RcQueueAnim>
  )
}

export default Profile
