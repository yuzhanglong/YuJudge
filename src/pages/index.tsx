/*
 * File: MyRouter.tsx
 * Description: 路由组件出口
 * Created: 2020-7-19 19:12:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


// 路由图标
import {
  DashboardOutlined,
  UserOutlined,
  ProfileOutlined,
  CloudServerOutlined,
  SettingOutlined
} from "@ant-design/icons";


// 懒加载封装


import Common from "../layout/common/Common";


// 待开发
import Solution from "./common/solution/Solution";
import Discussion from "./common/discussion/Discussion";
import Ranking from "./common/ranking/Ranking";
import React from "react";

// cms 界面
const Dashboard = React.lazy(() => import('./cms/dashboard/Dashboard'));
const ProblemEdit = React.lazy(() => import('./cms/problemEdit/ProblemEdit'));
const ProblemManage = React.lazy(() => import('./cms/problemManage/ProblemManage'));
const ProblemSetManage = React.lazy(() => import("./cms/problemSetManage/ProblemSetManage"));
const UserManage = React.lazy(() => import('./cms/userManage/UserManage'));
const JudgeHostManage = React.lazy(() => import('./cms/judgeHostManage/JudgeHostManage'));
const JudgeHostInspect = React.lazy(() => import('./cms/judgeHostInspect/JudgeHostInspect'));
const ProblemSetEdit = React.lazy(() => import('./cms/problemSetEdit/ProblemSetEdit'));
const UserGroupManage = React.lazy(() => import('./cms/userGroupManage/UserGroupManage'));
const Settings = React.lazy(() => import("./cms/settings/Settings"));


// 一般界面
const ProblemHome = React.lazy(() => import("./common/problemHome/ProblemHome"));
const ProblemSetCount = React.lazy(() => import("./common/problemSetCount/ProblemSetCount"));
const ProblemSetProblems = React.lazy(() => import("./common/problemSetProblems/ProblemSetProblems"));
const ProblemSetHome = React.lazy(() => import("./common/problemSetHome/ProblemSetHome"));
const ProblemSets = React.lazy(() => import("./common/problemSets/ProblemSets"));
const Home = React.lazy(() => import("./common/home/Home"));
const ScoreBoard = React.lazy(() => import("./common/scoreBoard/ScoreBoard"));
const Login = React.lazy(() => import("./common/login/Login"));
const Landing = React.lazy(() => import("./common/landing/Landing"));
const Problems = React.lazy(() => import("./common/problems/Problems"));
const BasicResult = React.lazy(() => import("./common/basicResult/BasicResult"));
const SubmissionInspect = React.lazy(() => import("./common/submissionInspect/submissionInspect"));
const Profile = React.lazy(() => import("./common/profile/Profile"));


// 导出
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
  Common: Common,
  ScoreBoard: ScoreBoard,
  ProblemSetProblems: ProblemSetProblems,
  ProblemSetHome: ProblemSetHome,
  UserGroupManage: UserGroupManage,
  UserManage: UserManage,
  JudgeHostInspect: JudgeHostInspect,
  JudgeHostManage: JudgeHostManage,
  ProblemSetCount: ProblemSetCount,
  Problems: Problems,
  Home: Home,
  Profile: Profile,
  ProblemSets: ProblemSets,
  Solution: Solution,
  SubmissionInspect: SubmissionInspect,
  Discussion: Discussion,
  Ranking: Ranking,
  BasicResult: BasicResult,
  Settings: Settings
} as any;
