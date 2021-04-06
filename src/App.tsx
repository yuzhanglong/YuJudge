/*
 * File: App.tsx
 * Description: 项目入口
 * Created: 2020-08-05 11:53:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { Suspense, useContext } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import zh_CN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_US'
import { ConfigProvider } from 'antd'
import MyRouter from './router/MyRouter'
import { ReactReduxContext } from 'react-redux'
import { AppStore } from './store/reducer'

const App: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 挂载全局路由
  window.reactRouter = props.history

  const { store } = useContext(ReactReduxContext)
  const state: AppStore = store.getState()
  return (
    <ConfigProvider locale={state.language === 'zh-CN' ? zh_CN : en_US}>
      <div className='App'>
        <Suspense fallback={null}>
          <MyRouter />
        </Suspense>
      </div>
    </ConfigProvider>
  )
}

export default withRouter(App)
