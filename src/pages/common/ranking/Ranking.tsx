/*
 * File: Ranking.tsx
 * Description: 排名页面
 * Created: 2020-8-26 20:28:28
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {Card, Empty} from 'antd';

interface RankingProps {

}
const Ranking: React.FunctionComponent<RankingProps> = () => {
  return (
    <Card>
      <Empty description={'排名板块开发中....'}/>
    </Card>
  )
}

export default Ranking;