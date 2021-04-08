/*
 * File: basicResult.tsx
 * Description: 结果提示，例如404、403等，告知用户发生了错误/接下来该做什么
 * Created: 2020-8-30 22:49:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, { useContext } from 'react'
import { Button, Result } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import style from './basicResult.module.scss'
import { ResultPageParam } from '../../../common/enumerations'
import { LocalContext } from '../../../components/localContext/LocalContext'

interface BasicResultProps {

}

const BasicResult: React.FunctionComponent<BasicResultProps & RouteComponentProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  const type: string = (props.match.params as any).type

  // 返回首页
  const goHome = () => {
    props.history.replace('/common/home')
  }

  // 前往登录
  const gotoLogin = () => {
    props.history.replace('/login')
  }

  // 去题目集首页
  const goToProblemSets = () => {
    props.history.replace('/common/problem_sets')
  }

  // 获取结果
  const getResult = () => {
    switch (type) {
      case ResultPageParam.NOT_FOUND:
        return cmp404
      case ResultPageParam.FORBIDDEN:
        return cmp403
      case ResultPageParam.PROBLEM_SET_FORBIDDEN:
        return cmpProblemSetForBidden
      default:
        return cmp404
    }
  }

  const cmp404 = (
    <Result
      status='404'
      title='404'
      subTitle={localContext.basicResult.cannotFind}
      extra={
        <Button type='primary' onClick={() => goHome()}>
          {localContext.basicResult.goToHome}
        </Button>
      }
    />
  )

  const cmp403 = (
    <Result
      status='403'
      title='403'
      subTitle={localContext.basicResult.loginError}
      extra={
        <Button type='primary' onClick={() => gotoLogin()}>
          {localContext.basicResult.gotoLogin}
        </Button>
      }
    />
  )

  const cmpProblemSetForBidden = (
    <Result
      status='403'
      title='403'
      subTitle={localContext.problemSet.forbidden}
      extra={
        <Button type='primary' onClick={() => goToProblemSets()}>
          {localContext.basicResult.backProblemSet}
        </Button>
      }
    />
  )

  return (
    <div className={style.basic_result}>
      {getResult()}
    </div>
  )
}

export default BasicResult
