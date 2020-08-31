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
import loadable from "../utils/loadable";

import Common from "../layout/common/Common";


// 待开发
import Solution from "./common/solution/Solution";
import Submission from "./common/submission/Submission";
import Discussion from "./common/discussion/Discussion";
import Ranking from "./common/ranking/Ranking";
import Profile from "./common/profile/Profile";

// cms 界面
const Dashboard = loadable(import('./cms/dashboard/Dashboard'));
const ProblemEdit = loadable(import('./cms/problemEdit/ProblemEdit'));
const ProblemManage = loadable(import('./cms/problemManage/ProblemManage'));
const ProblemSetManage = loadable(import("./cms/problemSetManage/ProblemSetManage"));
const UserManage = loadable(import('./cms/userManage/UserManage'));
const JudgeHostManage = loadable(import('./cms/judgeHostManage/JudgeHostManage'));
const JudgeHostInspect = loadable(import('./cms/judgeHostInspect/JudgeHostInspect'));
const ProblemSetEdit = loadable(import('./cms/problemSetEdit/ProblemSetEdit'));
const UserGroupManage = loadable(import('./cms/userGroupManage/UserGroupManage'));


// 一般界面
const ProblemHome = loadable(import("./common/problemHome/ProblemHome"));
const ProblemSetCount = loadable(import("./common/problemSetCount/ProblemSetCount"));
const ProblemSetProblems = loadable(import("./common/problemSetProblems/ProblemSetProblems"));
const ProblemSetHome = loadable(import("./common/problemSetHome/ProblemSetHome"));
const ProblemSets = loadable(import("./common/problemSets/ProblemSets"));
const Home = loadable(import("./common/home/Home"));
const ScoreBoard = loadable(import("./common/scoreBoard/ScoreBoard"));
const Login = loadable(import("./common/login/Login"));
const Landing = loadable(import("./common/landing/Landing"));
const Problems = loadable(import("./common/problems/Problems"));
const BasicResult = loadable(import("./common/basicResult/BasicResult"))


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
  Submission: Submission,
  Discussion: Discussion,
  Ranking: Ranking,
  BasicResult: BasicResult
} as any;