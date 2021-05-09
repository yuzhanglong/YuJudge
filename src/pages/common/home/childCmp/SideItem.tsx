/*
 * File: SideItem.tsx
 * Description: 首页侧边栏
 * Created: 2020-8-31 13:11:54
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Card } from 'antd'
import style from '../home.module.scss'
import { Meta } from 'antd/es/list/Item'
import QuickStart from './QuickStart'
import UserTable from '../../../../components/userTable/UserTable'
import RcQueueAnim from 'rc-queue-anim'
import { DailyWord } from '../../../../models/common'
import { UserInfo } from '../../../../models/user'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface SideItemProps {
  dailyWord?: DailyWord;
  activeUserInfo: UserInfo[];
}

const SideItem: React.FunctionComponent<SideItemProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  // 搜索按钮被按下
  const onSearch = (problemId: string) => {
    window.reactRouter.push(`/common/problem/${problemId}`)
  }

  return (
    <RcQueueAnim>
      <div key={'home_content_side_item1'}>
        <Card title={localContext.home.daily} className={style.home_content_side_item}>
          <Meta title={props.dailyWord?.title} />
        </Card>
      </div>
      <div key={'home_content_side_item2'}>
        <Card title={localContext.home.quickStart} className={style.home_content_side_item}>
          <QuickStart onSearch={(value) => onSearch(value)} />
        </Card>
      </div>
      <div key={'home_content_side_item3'}>
        <Card
          title={localContext.home.activeUser}
          className={style.home_content_side_item}>
          <UserTable
            userInfo={props.activeUserInfo}
            tableSize={'middle'}
            userNameCanClick />
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default SideItem
