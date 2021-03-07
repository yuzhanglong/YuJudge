---
title: 判题服务器 API
---
## 总述
###  对 API 的一些说明
1） URL 路径代表一种资源，只能为名词，推荐使用复数，不能为动词，请求方法已经表达动作意义。

2） URL 路径不能使用大写，单词如果需要分隔，统一使用下划线。

3） **GET**：从服务器取出资源。

4） **POST**：在服务器新建一个资源。

5） **PUT**：在服务器更新资源。

6） **DELETE**：从服务器删除资源。

### 错误码
``` yaml
00000: 一切正常
A0001: 用户错误
A0002: 用户表单错误
A0003: 用户名或密码错误
A0004: 权限错误
A0005: 不支持的判题偏好
A0006: 请求内容为空
B0001: 服务器错误
B1002: 找不到文件依赖
B1003: 找不到文件
B1004: 判题需求文件下载失败
B1005: 判题服务器负载已满
B1006: 当前有任务正在进行中, 无法修改
B1007: 文件不存在
```

### 其他的一些注意事项
1） 体验 api 的`baseUrl`为`47.106.202.255:8080`, 可以调取此接口来测试，但是不保证此接口长期有效，建议自行部署判题机服务。
2） 文档提供了`【A+B Problem】`的四种语言代码请求方式，其中，服务端响应的信息在`java`的版本中可以找到，其他的版本**将被略去**。

### 参考资料
- 阿里巴巴 Java 开发手册（嵩山版）

## 接口详情

### 执行判题 -- A + B Problem(JAVA)
**请求 URL：** 
- `47.106.202.255:8080/judge/result`
  

**请求方式：**
- POST 


 **请求参数示例**

``` json
{
    "language": "JAVA",
    "solutions": [
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        },
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        }
    ],
    "submissionCode":"import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner in = new Scanner(System.in);\n        int a = in.nextInt();\n        int b = in.nextInt();\n        System.out.println(a + b);\n    }\n}",
    "judgePreference": "OI",
    "memoryLimit":30000,
    "outputLimit": 10000
}
```

##### 返回示例 

``` json
  {
    "judgeResults": [
        {
            "realTimeCost": "112",
            "memoryCost": "26404",
            "cpuTimeCost": "104",
            "condition": 0,
            "stdInPath": "/home/judgeEnvironment/resolutions/e11a6dc4-b882-4e18-9ea5-8f9582fc4a60/solution.in",
            "stdOutPath": "/home/judgeEnvironment/submissions/c4154a3e-4105-445c-84e4-dd92d4086f2b/running_0.out",
            "stdErrPath": "/home/judgeEnvironment/submissions/c4154a3e-4105-445c-84e4-dd92d4086f2b/running_0.err",
            "message": "ACCEPT"
        },
        {
            "realTimeCost": "131",
            "memoryCost": "29028",
            "cpuTimeCost": "119",
            "condition": 0,
            "stdInPath": "/home/judgeEnvironment/resolutions/e11a6dc4-b882-4e18-9ea5-8f9582fc4a60/solution.in",
            "stdOutPath": "/home/judgeEnvironment/submissions/c4154a3e-4105-445c-84e4-dd92d4086f2b/running_1.out",
            "stdErrPath": "/home/judgeEnvironment/submissions/c4154a3e-4105-445c-84e4-dd92d4086f2b/running_1.err",
            "message": "ACCEPT"
        }
    ],
    "submissionId": "c4154a3e-4105-445c-84e4-dd92d4086f2b",
    "judgeEndTime": 1599143354314,
    "extraInfo": []
}
```

##### 返回参数说明 

|参数|类型|描述|
|:-------|:-------|:-------|
| judgeResults |array  | 判题结果合集列表 |
| realTimeCost | string| 消耗时间 |
| memoryCost | string| 消耗内存 |
| cpuTimeCost | string| 消耗 cpu 时间 |
| condition | number| 判题结果 |
| stdInPath | string| 判题服务器上的标准输入路径 |
| stdOutPath | string| 判题服务器上的标准输出路径 |
| stdErrPath | string| 判题服务器上的标准错误路径 |
| message | string| 判题结果描述, 例如 [ACCEPT],表示通过 |
| submissionId | string| 本次提交的 id |
| judgeEndTime | number| 本次判题完成的时间 |
| extraInfo |object  | 额外信息(当前为编译器输出信息) |


### 执行判题 -- A + B Problem(C)
**请求 URL：** 

- `47.106.202.255:8080/judge/result`

**请求方式：**
- POST 


 **请求参数示例**

``` json
{
    "language": "C",
    "solutions": [
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        },
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        }
    ],
    "submissionCode": "#include<stdio.h>\nint main(void)\n{\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"%d\", a + b);\n    return 0;\n}",
    "judgePreference": "OI",
    "memoryLimit": 10000,
    "outputLimit": 100,
    "cpuTimeLimit":100
}
```
- 返回参数以及更多的细节内容见【执行判题 --  A + B Problem(JAVA)】



### 执行判题 -- A + B Problem(C_PLUS_PLUS)

**请求 URL：** 

- `47.106.202.255:8080/judge/result`

**请求方式：**

- POST 


 **请求参数示例**

``` json
{
    "language": "C_PLUS_PLUS",
    "solutions": [
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        },
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        }
    ],
    "submissionCode": "#include<stdio.h>\nint main(void)\n{\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"%d\", a + b);\n    return 0;\n}",
    "judgePreference": "OI",
    "outputLimit": 100
}
```
- 返回参数以及更多的细节内容见【执行判题 --  A + B Problem(JAVA)】



### 执行判题 -- A + B Problem(PYTHON)

**请求 URL：** 
- `47.106.202.255:8080/judge/result`

**请求方式：**
- POST 

 **请求参数示例**

``` json
{
    "language": "PYTHON",
    "solutions": [
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        },
        {
            "stdIn": "http://cdn.yuzzl.top/1596680709217.in",
            "expectedStdOut": "http://cdn.yuzzl.top/1596680709217.out"
        }
    ],
    "submissionCode": "raw = input()\nprint(sum(map(int, raw.split())))",
    "judgePreference": "OI",
    "memoryLimit": 65536,
    "outputLimit": 1000000
}
```
- 返回参数以及更多的细节内容见【执行判题 — A + B Problem(JAVA)】



### 连接测试, 并获取基本信息

**请求 URL：** 
- `47.106.202.255:8080/common/connection_test`

**请求方式：**

- GET 

##### 返回示例 

``` json
{
    "code": "00000",
    "message": "judgeHost运行正常",
    "request": null,
    "data": {
        "workPath": null,
        "scriptPath": "/home/judgeEnvironment/scripts",
        "resolutionPath": "/home/judgeEnvironment/resolutions",
        "port": 8080,
        "workingAmount": 0,
        "cpuCoreAmount": 8,
        "memoryCostPercentage": 85,
        "cpuCostPercentage": 10,
        "queueAmount": 0,
        "maxWorkingAmount": 8,
        "version": "V1.0.0"
    }
}
```

##### 返回参数说明 

| 参数                 | 类型   | 描述                       |
| :------------------- | :----- | :------------------------- |
| workPath             | object | 判题工作目录               |
| scriptPath           | string | 判题脚本目录               |
| resolutionPath       | string | 解决方案(正确测试点)目录   |
| port                 | number | 判题机端口                 |
| workingAmount        | number | 当前工作数目               |
| cpuCoreAmount        | number | 判题机 cpu 核心数目          |
| memoryCostPercentage | number | 内存消耗百分比             |
| cpuCostPercentage    | number | cpu 消耗百分比              |
| queueAmount          | number | 判题机等候判题队列最大数目 |
| maxWorkingAmount     | number | 判题机最大工作数目         |
| version              | string | 判题机版本号               |

### 清空解决方案目录

**请求 URL：** 
- `47.106.202.255:8080/file/solution_path`

**请求方式：**
- DELETE 

##### 返回示例 

``` json
{
    "code": "00000",
    "message": "删除成功",
    "request": null,
    "data": null
}
```

### 清空提交目录

**请求 URL**：

- `47.106.202.255:8080/file/submission_path`

**请求方式：**
- DELETE 

##### 返回示例 

``` json
{
    "code": "00000",
    "message": "删除成功",
    "request": null,
    "data": null
}
```



### 下载某个提交

**请求 URL**：

- `47.106.202.255:8080/file/{submissionId}`

**请求方式：**

- DELETE 

**下载文件描述**：

```plain
result               // 压缩包名称，为submissionId
├─ build.sh          // 编译脚本
├─ compile.err       // 编译错误输出
├─ compile.out       // 编译输出
├─ Main.c            // 代码文件
├─ run               // 运行脚本
├─ running_0.err     // 运行错误输出（表示第0个测试点）
├─ running_0.out     // 运行输出（表示第0个测试点）
├─ running_1.err     // 运行错误输出（表示第1个测试点）
└─ running_1.out     //运行输出（表示第1个测试点）
```



### 获取判题服务器接口调用凭据

##### 请求 URL
- `/auth/access_token`
  
##### 请求方式
- POST

##### 参数

| 参数       | 类型   | 描述   |
| :--------- | :----- | :----- |
| userId     | string | 用户名 |
| userSecret | string | 密码   |


##### 返回示例 

``` json
{
    "accessToken":"判题服务器接口调用凭据将显示在这里",
    "expiresIn": 14400
}
```

##### 返回参数说明 

| 参数        | 类型   | 描述                   |
| :---------- | :----- | :--------------------- |
| accessToken | string | 判题服务器接口调用凭据 |
| expiresIn   | number | 有效期，单位为秒       |

### 验证判题服务器接口调用凭据

**请求 URL**

##### 请求 URL

- `/auth/examination`

##### 请求方式

- POST

##### 参数

| 参数        | 类型   | 描述                   |
| :---------- | :----- | :--------------------- |
| accessToken | string | 判题服务器接口调用凭据 |


##### 返回示例 

``` json
{
    "code": "00000",
    "message": "ACCESS_TOKEN_PASS!",
    "request": null,
    "data": null
}
```

##### 返回参数说明 

| 参数    | 类型   | 描述                             |
| :------ | :----- | :------------------------------- |
| message | string | 通过则显示**ACCESS_TOKEN_PASS**! |