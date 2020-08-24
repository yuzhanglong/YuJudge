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
import ProblemSetEdit from "./problemSetEdit/ProblemSetEdit";
import Common from "../components/layout/problemSet/Common";
import ScoreBoard from "./scoreBoard/ScoreBoard";
import ProblemSetProblems from "./problemSetProblems/ProblemSetProblems";
import ProblemSetHome from "./problemSetHome/ProblemSetHome";
import UserGroupManage from "./userGroupManage/UserGroupManage";
import UserManage from "./userManage/UserManage";
import JudgeHostInspect from "./judgeHostInspect/JudgeHostInspect";
import JudgeHostManage from "./judgeHostManage/JudgeHostManage";
import ProblemSetCount from "./problemSetCount/ProblemSetCount";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import ProblemSets from "./problemSets/ProblemSets";

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
  SettingOutlined: SettingOutlined,
  ProblemSetEdit: ProblemSetEdit,
  ProblemSetLayout: Common,
  ScoreBoard: ScoreBoard,
  ProblemSetProblems: ProblemSetProblems,
  ProblemSetHome: ProblemSetHome,
  UserGroupManage: UserGroupManage,
  UserManage: UserManage,
  JudgeHostInspect: JudgeHostInspect,
  JudgeHostManage: JudgeHostManage,
  ProblemSetCount: ProblemSetCount,
  Home: Home,
  Profile: Profile,
  ProblemSets: ProblemSets
} as any;