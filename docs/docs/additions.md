---
title: 其他事项
---

### mysql、redis 的数据、用户的提交代码被存放在哪里了
这些资源被存放在`home/YuJudge`目录下，其中有以下子目录:

#### mysql

存放**mysql**的数据。挂载了镜像的`/var/lib/mysql`目录

#### redis

存放**redis**的数据，挂载了镜像的`/data`目录

#### resolutions(有 JudgeHost 时会有该目录)

所有从远程服务器下载的（测试点）资源

#### submissions

所有用户的解题代码

:::tip 及时清理不需要的文件

**JudgeHost**项目提供了 2 个与此相关的 API 可供调用，你可以点击下面的链接: 

- [(DELETE)清空解决方案目录](/judgeHostApi#清空解决方案目录)
- [(DELETE)清空提交目录](/judgeHostApi#清空解决方案目录)

未来会添加定时监控功能来实现对文件体积堆积过大的自动化处理，并在前端提供简单的操作方法。

:::