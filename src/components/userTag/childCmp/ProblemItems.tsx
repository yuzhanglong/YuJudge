/*
 * File: ProblemItems.tsx
 * Description: ac、try问题组件
 * Created: 2020-9-5 19:54:50
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import {ProblemCountItem} from '../../../models/problem';
import {Button, Col, Row} from 'antd';

interface ProblemItemsProps {
  items: ProblemCountItem[];
}

const ProblemItems: React.FunctionComponent<ProblemItemsProps> = (props) => {
  const onProblemClick = (pid: number) => {
    window.reactRouter.push('/common/problem/' + pid)
  }

  const renderItems = () => {
    return props.items.map(res => {
      return (
        <Col style={{fontWeight: 'bold'}} span={12} key={res.problemId}>
          <Button type={'link'} onClick={() => onProblemClick(res.problemId)}>
            [{res.problemId}]
          </Button>
          {' ' + res.name}
        </Col>
      )
    })
  }
  return (
    <Row>
      {renderItems()}
    </Row>
  )
}

export default ProblemItems;