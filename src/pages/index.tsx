/*
 * File: MyRouter.tsx
 * Description: 路由组件出口
 * Created: 2020-7-19 19:12:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import ProblemSetManage from "./cms/problemSetManage/ProblemSetManage";
import ProblemManage from "./cms/problemManage/ProblemManage";
import ProblemEdit from "./cms/problemEdit/problemEdit";
import Login from "./common/login/Login";
import Landing from "./common/landing/Landing";
import Dashboard from "./cms/dashboard/Dashboard";
import ProblemHome from "./common/problemHome/ProblemHome";
import {
  DashboardOutlined,
  UserOutlined,
  ProfileOutlined,
  CloudServerOutlined,
  SettingOutlined
} from "@ant-design/icons/lib";
import ProblemSetEdit from "./cms/problemSetEdit/ProblemSetEdit";
import Common from "../layout/common/Common";
import ScoreBoard from "./common/scoreBoard/ScoreBoard";
import ProblemSetProblems from "./common/problemSetProblems/ProblemSetProblems";
import ProblemSetHome from "./common/problemSetHome/ProblemSetHome";
import UserGroupManage from "./cms/userGroupManage/UserGroupManage";
import UserManage from "./cms/userManage/UserManage";
import JudgeHostInspect from "./cms/judgeHostInspect/JudgeHostInspect";
import JudgeHostManage from "./cms/judgeHostManage/JudgeHostManage";
import ProblemSetCount from "./common/problemSetCount/ProblemSetCount";
import Home from "./common/home/Home";
import Profile from "./common/profile/Profile";
import ProblemSets from "./common/problemSets/ProblemSets";
import Solution from "./common/solution/Solution";
import Submission from "./common/submission/Submission";
import Discussion from "./common/discussion/Discussion";
import Ranking from "./common/ranking/Ranking";

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
  ProblemSets: ProblemSets,
  Solution: Solution,
  Submission: Submission,
  Discussion: Discussion,
  Ranking: Ranking
} as any;