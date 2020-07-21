import {Breadcrumb as AntdBreadcrump} from "antd";
import React from "react";
import {withRouter} from "react-router";
import { RouteComponentProps } from "react-router-dom";

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