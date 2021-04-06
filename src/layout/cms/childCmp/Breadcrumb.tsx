/*
 * File: Breadcrumb.tsx
 * Description: cms面包屑导航
 * Created: 2020-08-11 13:54:32
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {Breadcrumb as AntdBreadcrump} from 'antd';
import React from 'react';
import {withRouter} from 'react-router';
import {RouteComponentProps} from 'react-router-dom';

interface BreadcrumbProps {

}

const Breadcrumb: React.FunctionComponent<BreadcrumbProps & RouteComponentProps> = (props) => {
  return (
    <AntdBreadcrump style={{margin: '16px 0'}}>
      <AntdBreadcrump.Item>{props.location.pathname}</AntdBreadcrump.Item>
    </AntdBreadcrump>
  )
}

export default withRouter(Breadcrumb);
