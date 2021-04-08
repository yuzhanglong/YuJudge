/*
 * File: zh-CN.ts
 * Description: 中文语言模块
 * Created: 2021-4-8 00:14:38
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { Locale } from './types'

export const zhCN: Locale = {
  localName: 'zh-CN',
  current: '当前',
  unlimited: '无限制',
  switch: '切换',
  close: '关闭',
  open: '开启',
  confirm: '确定',
  condition: '状态',
  name: '名称',
  edit: '编辑',
  operation: '操作',
  seeDetail: '查看详情',
  analysis: '数据统计',
  delete: '删除',
  cancel: '取消',
  createTime: '创建时间',
  deadline: '截止时间',
  settingPage: {
    baseCard: '系统设置',
    commonZoneTitle: '一般项',
    dangerZoneTitle: '危险项',
    setConcurrency: '设置同时运行的判题个数',
    setConcurrencyDesc: '同时运行的判题个数，可以根据实际配置进行修改',
    setGapTime: '设置提交间隔时间',
    setLanguage: '设置语言',
    submissionFrequencyText: '用户两次提交的间隔时间(秒)，用来防止接口恶意调用、频繁提交',
    checkCodeInfo: '开启/关闭验证码功能',
    checkCodeDetail: '如果关闭，网站的登录、注册验证码将失效',
    closeAll: '关闭所有判题服务',
    closeAllInfo: '所有用户将无法提交代码至判题机'
  },
  judgeHost: {
    baseCard: '全部判题机',
    commonZoneTitle: '一般项',
    dangerZoneTitle: '危险项',
    cpuCoreAmount: 'cpu 核心数',
    currentJudgeAmount: '当前判题个数',
    cpuCost: 'cpu 消耗',
    memoryCost: '内存消耗',
    newJudgeHost: '新建判题机',
    basicInfo: '基本信息',
    close: '关闭这个判题服务器',
    closeDesc: '这个判题服务器将不再接受任何任务直到重新启动',
    delete: '删除这个判题服务器',
    deleteDetail: '注意: 这个操作不可恢复',
    createSuccess: '创建成功',
    running: '运行中',
    noConnection: '无连接',
    stopped: '已暂停'
  },
  problemSet: {
    id: '题目集 ID',
    name: '题目集名称',
    preference: '判题偏好',
    languageSupport: '支持语言',
    author: '创建者',
    create: '创建题目集',
    onlyShowActive: '只显示活跃题目集'
  },
  problemManage: {
    baseCard: '题目管理',
    createProblem: '创建题目'
  },
  problem: {
    id: '题目 ID',
    name: '问题名称',
    tag: '问题标签'
  },
  user: {
    name: '用户名',
    group: '所在用户组',
    email: '邮箱',
    operation: '操作',
    allocateGroup: '分配用户组',
    userTypes: '筛选用户类型',
    all: '所用用户',
    manager: '系统管理员',
    commonUser: '一般用户',
    problemManager: '管理题目集/题目',
    create: '创建用户',
    rank: '排名',
    acAmount: 'AC 数',
    submissionAmount: '提交数'
  },
  userGroup: {
    name: '名称',
    desc: '描述',
    auth: '授权',
    create: '创建用户组'
  },
  dashBoard: {
    total: '问题总数',
    submission: '提交总数',
    userAmount: '用户人数',
    judgeCore: '判题核心',
    sevenDays: '近七日提交',
    tfHours: '全站24小时提交',
    recentProblem: '最新问题',
    activeUser: '活跃用户'
  }
} as any
