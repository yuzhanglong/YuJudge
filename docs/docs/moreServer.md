---
title: 集群部署(多个判题机)
---



## 部署判题机

### 获取部署脚本

```shell
wget http://cdn.yuzzl.top/docker-compose-single.yml
```

### 执行部署

```shell
docker-compose up -d
```

部署完成之后，整个项目结构如下所示：

![image-20200913161249447](http://cdn.yuzzl.top/judge-host.png)

其中，使用浏览器访问服务器的**8081端口**（JudgeServer，判题服务器），看到以下内容,  说明部署成功

```json
{
	"code":"00000",
	"message":"Your project is running successfully! O(∩_∩)O",
	"request":null,
	"data":null
}
```



## 连接

以**管理员身份**进入后台，点击【判题机管理】 - 【添加一个判题机】，起个好听的名字，然后输入你部署判题机的地址，端口(默认为**8080**)，点击确定，即可添加这台判题机。

![](http://cdn.yuzzl.top/add_judge_host.png)

当新添加的判题机的标签显示【**已暂停**】，说明判题机已经添加成功了，并已经正确连接，接下来你只需点击【查看详情】，在接下来的页面中点击【**启用这个判题服务器**】按钮即可。



:::tip 并没有新增记录

主服务器（JudgeServer）每隔**2秒钟**会访问一次所有的判题服务器来测试连接，可能存在一定的延迟，你可以刷新页面试试

:::