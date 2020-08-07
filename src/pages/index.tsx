/*
 * File: MyRouter.tsx
 * Description: 路由组件出口
 * Created: 2020-7-19 19:12:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import ProblemSetManage from "./problemSetManage/problemSetManage";
import ProblemManage from "./problemManage/ProblemManage";
import ProblemEdit from "./problemEdit/problemEdit";
import Login from "./login/Login";
import Landing from "./landing/Landing";
import Dashboard from "./dashboard/Dashboard";
import ProblemHome from "./problemHome/ProblemHome";

export default {
  ProblemManage: ProblemManage,
  ProblemSetManage: ProblemSetManage,
  ProblemEdit: ProblemEdit,
  Login: Login,
  Landing: Landing,
  Dashboard: Dashboard,
  ProblemHome: ProblemHome
} as any;