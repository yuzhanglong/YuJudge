/*
 * File: JudgeHostManage.tsx
 * Description: 判题服务器管理页面
 * Created: 2020-08-16 16:41:49
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card} from "antd";
import {getJudgeHostsInfo} from "../../network/judgeHostRequest";
import {JudgeHostInfo} from "../../models/judgeHost";
import JudgeHostTable from "../../components/judgeHostTable/JudgeHostTable";

interface JudgeServerManageProps {

}

const JudgeHostManage: React.FunctionComponent<JudgeServerManageProps> = (props) => {

  // 所有的判题服务器信息
  const [judgeHostsInfo, setJudgeHostInfo] = useState<JudgeHostInfo[]>([]);

  useEffect(() => {
    getJudgeHosts();
  }, []);

  // 请求判题服务器信息
  const getJudgeHosts = () => {
    getJudgeHostsInfo()
      .then(res => {
        setJudgeHostInfo(res.data);
      });
  }

  // 渲染操作
  const renderOperations = (value: any) => {
    return (
      <div>
        <Button type={"link"}>
          查看详情
        </Button>
      </div>
    )
  }

  return (
    <Card title={"全部判题机"}>
      <JudgeHostTable
        judgeHosts={judgeHostsInfo}
        operations={renderOperations}/>
    </Card>
  )
}

export default JudgeHostManage;