/*
 * File: index.tsx
 * Description: 路由组件出口
 * Created: 2020-7-19 19:12:23
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import ProblemManage from "./ProblemManage/ProblemManage";
import ProblemSetManage from "./ProblemSetManage/ProblemSetManage";
import ProblemEdit from "./ProblemEdit/problemEdit";

export default {
  ProblemManage: ProblemManage,
  ProblemSetManage: ProblemSetManage,
  ProblemEdit:ProblemEdit
} as any;
