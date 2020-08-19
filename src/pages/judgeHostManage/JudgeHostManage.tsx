/*
 * File: JudgeHostManage.tsx
 * Description: 判题服务器管理页面
 * Created: 2020-08-16 16:41:49
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Badge, Button, Card} from "antd";
import {getJudgeHostsInfo} from "../../network/judgeHostRequest";
import {JudgeHostInfo} from "../../models/judgeHost";
import JudgeHostTable from "../../components/judgeHostTable/JudgeHostTable";
import {RouteComponentProps} from "react-router-dom";

interface JudgeServerManageProps {

}

const JudgeHostManage: React.FunctionComponent<JudgeServerManageProps & RouteComponentProps> = (props) => {

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
  const renderOperations = (value: JudgeHostInfo) => {
    return (
      <div>
        <Button type={"link"} onClick={() => onSeeDetailButtonClick(value.id)}>
          查看详情
        </Button>
      </div>
    )
  }

  // 查看详情按钮被单击
  const onSeeDetailButtonClick = (judgeHostId: number) => {
    props.history.push(`/cms/judge_hosts/inspect/${judgeHostId}`)
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