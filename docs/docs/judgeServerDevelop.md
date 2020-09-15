---
title: 针对服务端的二次开发
---

## 了解大致目录结构

以下是项目的大致目录结构，只列举主要枝干，细节文件略去。

```
YuJudge-JudgeServer                               // 根目录
├─ deploy                                         // 部署相关
├─ help                                           // 帮助文件
-------------------src------------------
├─ bo                                             // 业务对象
├─ controller                                     // 控制层
│  ├─ v1                                          // v1接口
│  └─ v2                                          // v2接口
├─ core                                           // 项目基础功能
│  ├─ authorization                               // 鉴权
│  ├─ common                                      // 一般项
│  ├─ configuration                               // 配置类
│  ├─ enumeration                                 // 枚举类
│  ├─ exception                                   // 异常类
│  ├─ factory                                     // 工厂类
│  ├─ handler                                     // 处理、调度
│  ├─ init                                        // 项目初始化
│  ├─ interceptor                                 // 拦截器
│  └─ task                                        // 定时任务
├─ dto                                            // 数据传输对象
├─ model                                          // 模型(实体类)
├─ network                                        // 网络请求相关
├─ repository                                     // 数据库操作类
├─ service                                        // 业务层
├─ store                                          // 存储相关
│  └─ redis                                       // redis
├─ utils                                          // 工具类
│  └─ validators                                  // 验证器
├─ vo                                             // 视图层对象
└─ YuJudgeJudgeServerApplication.java             // 项目入口
└─ resources                                      // 资源
├─ application.yml                                // 全局配置
    └─ config                                     // 其他配置
    ├─ application-dev.yml                        // 开发环境配置
    ├─ application-prod.yml                       // 生产环境配置
    └─ exception-codes.yml                        // 全局错误码
└─ test                                           // 测试
  ├─ java                                         // java测试
  └─ python                                        // Python测试脚本
```

## 权限管理机制

### 总述

项目的权限管理机制在数据库层面依赖了**三张表**，即**用户表**、**用户组表**、**权限表**。最终呈现的是**用户 -- 权限的关系**。

### 接口级别拦截

对于**接口级别**的权限管理，我们提供了一个注解`@AuthorizationRequired`，如果你要为新增的接口进行权限限制，只需要这样做：

```java
/**
 * 开启或者关闭验证码验证功能
 *
 * @author yuzhanglong
 * @date 2020-8-30 21:18:31
 */
    @PutMapping("/check_code_condition")
    @AuthorizationRequired(permission = PermissionEnum.ADMIN)
    public UnifiedResponse resetCheckCodeCondition() {
        Boolean res = commonService.resetCheckCodeCondition();
        return new UnifiedResponse("验证码验证功能已重置");
    }
```

`@AuthorizationRequired`有一个可选参数，代表了这个接口只有该参数对应的权限的用户才可以访问，上面的代码代表了接口`/check_code_condition`只有`ADMIN`可以访问。

### 系统默认的权限

在`core/enumeration`包下的 **PermissionEnum**，默认提供了三种权限:

```java
public enum PermissionEnum {    
    // 系统管理员
    ADMIN("系统管理员"),

    // 题目管理
    PROBLEM_MANAGER("管理题目和题目集"),

    // 公告、信息管理
    NOTICE_MANGER("公告、信息管理"),

    // 一切用户(登录用户)
    ANY("一切用户");
   
   	// ... 省略其他代码
}
```

如果要添加一个权限，只需要**增加一条枚举记录**就可以了，每次springboot项目启动时，这些权限会被**自动写入数据**库中。

:::danger 不要删除默认的权限

删除默认的权限可能会导致项目某些接口无法按期望运行。

:::

## 网络请求

在`network`包下封装了网络请求功能，本项目的网络请求主要是和判题机的交互。

如果你要添加网络请求，可参照此包下的`JudgeHostCommonRequest`类/`JudgeHostJudgeRequest`类。





## 数据库

项目数据库使用了**mysql**、**redis**。

在框架层面上，前者使用`SpringDataJPA`，后者采用 `SpringDataRedis`

### mysql

#### 总述

实体类位于`model`包下，和数据库的表一一对应， 所有实体类继承至该包下的`BaseEntity`。

操作（CRUD）类位于·`repository`包下，所有操作类继承至该包下的`BaseRepository`。

:::tip 轻松从数据库生成实体类

Idea这款IDE中的**Persistence**工具内置了这个功能，如果不知道的话可以了解一下。

:::

#### 软删除模式

软删除即不真正删除数据库中的数据, 我们通过`deleteTime`这个公共字段来实行软删除。

如果某张表要开启**软删除**模式，则让实体类继承`model`包下的`SoftDeleteEntity`，让CRUD类继承`repository`包下的`SoftDeleteRepository`即可。

:::caution 不要缺少默认的字段，否则程序无法启动！

- 非软删除表：id 、createTime（创建时间） 、updateTime（更新时间）
- 软删除表: id 、createTime（创建时间） 、updateTime（更新时间）、deleteTime(删除时间)

:::

### redis

#### 总述

redis的**基础类**`RedisOperations`位于`utils`包下。

redis的**操作类**位于`store/redis`包下，以 **业务名 + Cache表示**，例如**JudgeHostCache**表示与判题机相关的缓存处理类，操作类主要负责CRUD，对于数据的二次加工我留给**service**层完成。

本项目一般通过**service层**来调用**redis操作类**。

:::caution 对于缓存操作，注意**读写锁**，否则就会出现一些bug

- **读-读 可以共存** , **读-写 不能共存**。
- 可使用 concurrent包下的**ReadWriteLock**进行处理，具体可查看`JudgeHostCache`类

:::



