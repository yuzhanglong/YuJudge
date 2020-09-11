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
import style from "../../layout.module.scss";
import {
  AreaChartOutlined, FileSearchOutlined,
  HomeOutlined, QuestionCircleOutlined,
  SnippetsOutlined,
  UserOutlined
} from "@ant-design/icons";
import {LOGOS} from "../../../config/config";

interface CommonMenuProps {

}

const CommonMenu: React.FunctionComponent<CommonMenuProps & RouteComponentProps> = (props) => {
  // 用户信息
  const userInfoState = UserInfoState();

  // TODO: 这里实现方式明显不够优雅，需要改
  // 是否渲染题目集相关操作目录
  const getProblemSetId = () => {
    // 在题目集内
    if (props.location.pathname.includes("/common/problem_set/")) {
      const a = props.location.pathname;
      let arr = a.split("/");
      return arr[3];
    }
    return null;
  }

  return (
    <Row justify={"space-between"} className={style.problem_set_layout_menu}>
      <Col>
        <Menu mode="horizontal" selectedKeys={[props.location.pathname]}>
          <Menu.Item className={style.logo_wrap} onClick={() => props.history.push("/")}>
            <img src={LOGOS.WITH_TEXT} alt={"logo"} width={120}/>
          </Menu.Item>
          <Menu.Item key="/common/home" icon={<HomeOutlined/>}>
            <Link to={`/common/home`}>
              <span className={style.nav_text}>首页</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/common/problem" icon={<QuestionCircleOutlined/>}>
            <Link to={"/common/problem"}>
              <span className={style.nav_text}>问题</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/common/problem_sets" icon={<SnippetsOutlined/>}>
            <Link to={`/common/problem_sets`}>
              <span className={style.nav_text}>题目集</span>
            </Link>
          </Menu.Item>
          {
            getProblemSetId() &&
            <Menu.Item icon={<FileSearchOutlined/>} key={`/common/problem_set/${getProblemSetId()}/overview`}>
              <Link to={`/common/problem_set/${getProblemSetId()}/overview`}>
                <span className={style.nav_text}>概览</span>
              </Link>
            </Menu.Item>
          }
          {
            getProblemSetId() &&
            <Menu.Item icon={<FileSearchOutlined/>} key={`/common/problem_set/${getProblemSetId()}/problems`}>
              <Link to={`/common/problem_set/${getProblemSetId()}/problems`}>
                <span className={style.nav_text}>所有题目</span>
              </Link>
            </Menu.Item>
          }
          {
            getProblemSetId() &&
            <Menu.Item icon={<UserOutlined/>} key={`/common/problem_set/${getProblemSetId()}/score_board`}>
              <Link to={`/common/problem_set/${getProblemSetId()}/score_board`}>
                <span className={style.nav_text}>记分板</span>
              </Link>
            </Menu.Item>
          }

          {
            getProblemSetId() &&
            <Menu.Item icon={<AreaChartOutlined/>} key={`/common/problem_set/${getProblemSetId()}/count`}>
              <Link to={`/common/problem_set/${getProblemSetId()}/count`}>
                <span className={style.nav_text}>统计</span>
              </Link>
            </Menu.Item>
          }
        </Menu>
      </Col>
      <Col>
        <UserTag
          {...props}
          height={48}
          showGotoCms={!userInfoState.isCommonUser()}
          userName={userInfoState.userInfo?.nickname}
          description={userInfoState.userInfo?.userGroups ? userInfoState.userInfo?.userGroups[0].description : ""}
          avatar={userInfoState.userInfo?.avatar}/>
      </Col>
    </Row>
  )
}

export default CommonMenu;