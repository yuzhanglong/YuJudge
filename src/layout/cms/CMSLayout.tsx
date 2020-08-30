/*
 * File: CMSLayout.tsx
 * Description: 后台cms的基础布局
 * Created: 2020/8/23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Layout} from "antd";
import SideBar from "./childCmp/SideBar";
import routerConfig from "../../router/config";
import {RouteComponentProps} from "react-router-dom";
import CMSHeader from "./childCmp/CMSHeader";
import RcQueueAnim from "rc-queue-anim";

const {Content, Sider} = Layout;

interface CMSLayoutProps {
  children: React.ReactNode;
}

const CMSLayout: React.FunctionComponent<CMSLayoutProps & RouteComponentProps> = (props) => {
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
        <CMSHeader {...props}/>
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