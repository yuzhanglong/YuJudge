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
      <Sider
        width={230}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
        <div className="layout-logo"/>
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
      <Layout className="site-layout" style={{marginLeft: 230}}>
        <CMSHeader
          {...props}
          userInfo={userInfoState.userInfo ? userInfoState.userInfo : undefined}/>
        <Content className={"site-layout-content"}>
          <RcQueueAnim>
            <div key={"Breadcrumb"} style={{
              marginTop: 30
            }}>
            </div>
            <div key={"content"}>
              <div>
                {props.children}
              </div>
            </div>
          </RcQueueAnim>
        </Content>
      </Layout>
    </Layout>
  )
}
export default CMSLayout;