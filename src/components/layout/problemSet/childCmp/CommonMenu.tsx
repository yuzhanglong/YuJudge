/*
 * File: CommonMenu.tsx
 * Description: 一般页面的目录组件
 * Created: 2020-8-2 9:56
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Menu} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";

interface CommonMenuProps {

}

const CommonMenu: React.FunctionComponent<CommonMenuProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemSetId: number | null = params.problemSetId;
  // TODO: 注意这里的标签激活状态, 需要路由的附加信息来判断当前的路由是哪个标签
  return (
    <div>
      <Menu mode="horizontal" className={"problem-set-layout-menu"}>
        <Menu.Item key="overview" className={"problem-set-layout-menu-item"}>
          <Link to={`/problem_set/${problemSetId}/overview`}>
            <span className="nav-text">题目集</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="problems" className={"problem-set-layout-menu-item"}>
          <Link to={`/problem_set/${problemSetId}/problems`}>
            <span className="nav-text">所有题目</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="scoreBoard" className={"problem-set-layout-menu-item"}>
          <Link to={`/problem_set/${problemSetId}/score_board`}>
            <span className="nav-text">记分板</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default CommonMenu;