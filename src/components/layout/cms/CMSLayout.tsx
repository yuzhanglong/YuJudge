/*
 * File: CMSLayout.tsx
 * Description: 后台cms的基础布局
 * Created: 2020/8/23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, {useEffect, useState} from "react";
import {Layout} from "antd";
import SideBar from "./childCmp/SideBar";
import routerConfig from "../../../router/config";
import Breadcrumb from "./childCmp/Breadcrumb";
import {RouteComponentProps} from "react-router-dom";
import CMSHeader from "./childCmp/CMSHeader";
import {UserInfo} from "../../../models/user";
import {getUserInfo} from "../../../network/userRequest";

const {Content, Sider} = Layout;

interface CMSLayoutProps {
  children: React.ReactNode;
}

const CMSLayout: React.FunctionComponent<CMSLayoutProps & RouteComponentProps> = (props) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    getUserInfo().then(res => {
      setUserInfo(res.data);
    })
  }, []);


  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        width={230}
        theme="dark"
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
        <CMSHeader userInfo={userInfo} {...props}/>
        <Content className={"site-layout-content"}>
          <div key={"Breadcrumb"}>
            <Breadcrumb/>
          </div>
          <div>
            <div>
              {props.children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default CMSLayout;