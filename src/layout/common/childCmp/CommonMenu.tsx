/*
 * File: CommonMenu.tsx
 * Description: 一般页面的目录组件
 * Created: 2020-8-2 9:56
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {Col, Menu, Row} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";
import {UserInfoState} from "../../../hooks/userInfo";
import UserTag from "../../../components/userTag/UserTag";
import {HomeOutlined, QuestionCircleOutlined, SnippetsOutlined, UserOutlined} from "@ant-design/icons";

interface CommonMenuProps {

}

const CommonMenu: React.FunctionComponent<CommonMenuProps & RouteComponentProps> = (props) => {
  // 用户信息
  const userInfoState = UserInfoState();

  return (
    <div>
      <Row justify={"space-between"} className={"problem-set-layout-menu"}>
        <Col>
          <Menu mode="horizontal" activeKey={props.location.pathname}>
            <Menu.Item key="/common/home" icon={<HomeOutlined />}>
              <Link to={`/common/home`}>
                <span className="nav-text">首页</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="/common/problem_sets" icon={<SnippetsOutlined />}>
              <Link to={`/common/problem_sets`}>
                <span className="nav-text">题目集</span>
              </Link>
            </Menu.Item>

            <Menu.Item  key="/common/problem_set/100/problems" icon={<QuestionCircleOutlined />}>
              <Link to={`/common/problem_set/100/problems`}>
                <span className="nav-text">问题</span>
              </Link>
            </Menu.Item>

            <Menu.Item icon={<UserOutlined />} key={"/common/ranking"}>
              <Link to={`/common/ranking`}>
                <span className="nav-text">排名</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          <UserTag
            {...props}
            height={48}
            userName={userInfoState.userInfo?.nickname}
            description={userInfoState.userInfo?.userGroups ? userInfoState.userInfo?.userGroups[0].description : ""}
            avatar={userInfoState.userInfo?.avatar}/>
        </Col>
      </Row>

    </div>
  )
}

export default CommonMenu;