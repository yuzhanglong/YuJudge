/*
 * File: App.tsx
 * Description: 项目入口
 * Created: 2020-08-05 11:53:29
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { Suspense } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import antd_zh_CN from 'antd/es/locale/zh_CN'
import antd_en_US from 'antd/es/locale/en_US'
import { ConfigProvider } from 'antd'
import MyRouter from './router/MyRouter'
import { useSelector } from 'react-redux'
import { AppStore } from './store/reducer'
import { LocalContext } from './components/localContext/LocalContext'
import { zhCN, enUS } from './locale'


const App: React.FunctionComponent<RouteComponentProps> = (props) => {
  // 挂载全局路由
  window.reactRouter = props.history

  const language = useSelector<AppStore>(state => state.language)

  return (
    <ConfigProvider locale={language === 'zh-CN' ? antd_zh_CN : antd_en_US}>
      <LocalContext.Provider value={language === 'zh-CN' ? zhCN : enUS}>
        <div className='App'>
          <Suspense fallback={null}>
            <MyRouter />
          </Suspense>
        </div>
      </LocalContext.Provider>
    </ConfigProvider>
  )
}

export default withRouter(App)
