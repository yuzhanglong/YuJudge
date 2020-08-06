import React from "react";
import {Layout, Menu} from "antd";
import SideBar from "./SideBar";
import routerConfig from "../../router/config";
import Breadcrumb from "./Breadcrumb";
import {RouteComponentProps} from "react-router-dom";

const {Header, Content, Sider} = Layout;

interface CMSLayoutProps {
  cmsRoutes: any;
}

const CMSLayout: React.FunctionComponent<CMSLayoutProps & RouteComponentProps> = (props) => {
  return (
    <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={230}
          className="site-layout-background"
          theme="dark">
          <SideBar
            menus={routerConfig.menus}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0
            }}>
          </SideBar>
        </Sider>

        <Layout style={{padding: '0 24px 24px'}}>
          <Breadcrumb></Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: "82vh",
            }}>
            {props.cmsRoutes}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default CMSLayout;