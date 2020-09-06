/*
 * File: CMSLayout.tsx
 * Description: 后台cms的基础布局
 * Created: 2020/8/23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect} from "react";
import {Layout, message} from "antd";
import SideBar from "./childCmp/SideBar";
import routerConfig from "../../router/config";
import {RouteComponentProps} from "react-router-dom";
import CMSHeader from "./childCmp/CMSHeader";
import RcQueueAnim from "rc-queue-anim";
import {UserInfoState} from "../../hooks/userInfo";
import style from "../layout.module.scss";

const {Content, Sider} = Layout;

interface CMSLayoutProps {
  children: React.ReactNode;
}

const CMSLayout: React.FunctionComponent<CMSLayoutProps & RouteComponentProps> = (props) => {

  // 用户信息
  const userInfoState = UserInfoState();

  useEffect(() => {
    if (userInfoState.userInfo && userInfoState.isCommonUser()) {
      message.error("您无权访问该页面");
      props.history.replace("/common/home");
    }
  }, [props.history, userInfoState, userInfoState.userInfo]);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider className={style.cms_sider} width={230}>
        <div className={style.cms_logo}/>
        <SideBar
          menus={routerConfig.menus}
          theme={"dark"}
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0
          }}>
        </SideBar>
      </Sider>

      <Layout className={style.cms_right}>
        <CMSHeader{...props} userInfo={userInfoState.userInfo ? userInfoState.userInfo : undefined}/>
        <Content>
          <RcQueueAnim>
            <div key={"content"} className={style.cms_content}>
              {props.children}
            </div>
          </RcQueueAnim>
        </Content>
      </Layout>
    </Layout>
  )
}
export default CMSLayout;