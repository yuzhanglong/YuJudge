/*
 * File: Solution.tsx
 * Description: 题解/讨论页面
 * Created: 2020-8-26 14:15:56
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Empty} from 'antd';
import {EMPTY_IMAGE} from '../../../config/config';

interface SolutionProps {

}

const Solution: React.FunctionComponent<SolutionProps & RouteComponentProps> = () => {
  return (
    <div style={{
      height: 500
    }}>
      <Empty description={'under development...'} image={EMPTY_IMAGE}/>
    </div>
  )
}

export default Solution;
