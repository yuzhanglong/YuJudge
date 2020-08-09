/*
 * File: MyRouter.tsx
 * Description: 路由组件出口
 * Created: 2020-7-19 19:12:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import ProblemSetManage from "./problemSetManage/ProblemSetManage";
import ProblemManage from "./problemManage/ProblemManage";
import ProblemEdit from "./problemEdit/problemEdit";
import Login from "./login/Login";
import Landing from "./landing/Landing";
import Dashboard from "./dashboard/Dashboard";
import ProblemHome from "./problemHome/ProblemHome";
import {
  DashboardOutlined,
  UserOutlined,
  ProfileOutlined,
  CloudServerOutlined,
  SettingOutlined
} from "@ant-design/icons/lib";

export default {
  ProblemManage: ProblemManage,
  ProblemSetManage: ProblemSetManage,
  ProblemEdit: ProblemEdit,
  Login: Login,
  Landing: Landing,
  Dashboard: Dashboard,
  ProblemHome: ProblemHome,
  DashboardOutlined: DashboardOutlined,
  UserOutlined: UserOutlined,
  ProfileOutlined: ProfileOutlined,
  CloudServerOutlined: CloudServerOutlined,
  SettingOutlined: SettingOutlined
} as any;