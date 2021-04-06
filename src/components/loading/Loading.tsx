/*
 * File: Loading.tsx
 * Description: 加载过渡组件
 * Created: 2020-8-27 13:45:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';
import {Spin} from 'antd';

interface LoadingProps {

}

const Loading: React.FunctionComponent<LoadingProps> = () => {
  return (
    <Spin size="large" tip={'拼命加载中~'}/>
  )
}

export default Loading;