/*
 * File: HomeContent.tsx
 * Description: 首页主体
 * Created: 2020-8-31 13:16:17
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { useContext, useState } from 'react'
import { Button, Card } from 'antd'
import style from '../home.module.scss'
import NoticeTable from '../../../../components/noticeTable/NoticeTable'
import ProblemTable from '../../../../components/problemTable/ProblemTable'
import RcQueueAnim from 'rc-queue-anim'
import { NoticeInfo } from '../../../../models/notice'
import { Problem } from '../../../../models/problem'
import NoticeModal from '../../../../components/noticeModal/NoticeModal'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface HomeContentProps {
  // 公告列表
  notices: NoticeInfo[];
  // 问题列表
  problems: Problem[];
}

const HomeContent: React.FunctionComponent<HomeContentProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  // 公告详情是否可见
  const [noticeModalVisible, setNoticeModalVisible] = useState<boolean>(false)

  // 活跃的公告
  const [activeNotice, setActiveNotice] = useState<NoticeInfo>()

  // 跳转到某个problem
  const onGotoProblemButtonClick = (content: any) => {
    const problemId = content.id
    window.reactRouter.push(`/common/problem/${problemId}`)
  }

  // 公告被单击
  const onNoticeTableClick = (notice: NoticeInfo) => {
    setActiveNotice(notice)
    setNoticeModalVisible(true)
  }

  return (
    <RcQueueAnim>
      <div key={'home_content_item1'}>
        <NoticeModal
          onClose={() => setNoticeModalVisible(false)}
          visible={noticeModalVisible} notice={activeNotice} />
        <Card
          title={localContext.home.notice}
          className={style.home_content_item}>
          <NoticeTable
            notices={props.notices}
            onNoticeClick={(notice) => onNoticeTableClick(notice)} />
        </Card>
      </div>

      <div key={'home_content_item2'}>
        <Card
          title={localContext.home.recentUpdate}
          className={style.home_content_item}>
          <ProblemTable
            isShowProblemOrder={false}
            problems={props.problems}
            isShowOperations
            showEditButton={false}
            isShowTags={false}
            showPagination={false}
            tableSize={'middle'}
            otherOperations={(content: any) => {
              return (
                <Button
                  type={'link'}
                  onClick={() => onGotoProblemButtonClick(content)}>
                  {localContext.go}
                </Button>
              )
            }} />
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default HomeContent
