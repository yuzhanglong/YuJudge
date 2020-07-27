/*
 * File: index.tsx
 * Description: 路由组件出口
 * Created: 2020-7-19 19:12:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import ProblemSetManage from "./ProblemSetManage/problemSetManage";
import ProblemManage from "./ProblemManage/ProblemManage";
import ProblemEdit from "./ProblemEdit/ProblemEdit";

export default {
  ProblemManage: ProblemManage,
  ProblemSetManage: ProblemSetManage,
  ProblemEdit:ProblemEdit
} as any;
