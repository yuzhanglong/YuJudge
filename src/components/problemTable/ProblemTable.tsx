import React, {useEffect, useState} from "react";
import {timestampToDateTime} from "../../utils/DateTimeUtil";
import {Button, Table, Tag} from "antd";
import {Problem} from "../../models/problem";
import {getProblems} from "../../network/problemRequests";
import {BaseResponse} from "../../models/common";
import Column from "antd/lib/table/Column";

interface ProblemTableProps {
  isShowCreateTime?: boolean;
  isShowTags?: boolean;
  isShowOperations?: boolean;
  onProblemEdit?: (problemId: number) => void;
}


const ProblemTable: React.FunctionComponent<ProblemTableProps> = (props) => {
  // 问题创建时间
  const renderCreateTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>)
  }

  // 渲染标签
  const renderTags = (tags: string[]) => {
    if (tags == null) return null;
    return (
      <div>
        {tags.map((tag) => {
          return (
            <Tag color={"#409eff"} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </div>
    )
  }

  // 编辑按钮被按下
  const onEditButtonClick = (content: Problem) => {
    const problemId = content.id;
    if (props.onProblemEdit) {
      if (problemId != null) {
        props.onProblemEdit(problemId);
      }
    }
  }

  // 渲染操作相关
  const renderOperations = (content: any) => {
    return (
      <Button type="link"
              onClick={() => onEditButtonClick(content)}>
        编辑问题
      </Button>
    )
  }

  // states, data
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  // 请求problem
  useEffect(() => {
    setIsLoading(true);
    getProblems(0, 10)
      .then((res: BaseResponse) => {
        setTotalPage(res.data.totalPage);
        setProblems(res.data.items);
        setIsLoading(false);
      })
  }, []);

  return (
    <Table dataSource={problems}
           rowKey={"id"}
           loading={isLoading}
           pagination={
             {total: totalPage * 10, defaultPageSize: 10}
           }>
      <Column title={"题号"} dataIndex={"id"}
              key={"number"} width={150}/>
      <Column title={"问题名称"}
              dataIndex={"name"}
              key={"number"}
              width={150}/>
      {props.isShowTags &&
      <Column title={"标签"}
              dataIndex={"characterTags"}
              key={"number"}
              width={250}
              render={renderTags}/>}
      {props.isShowCreateTime &&
      <Column title={"创建时间"}
              dataIndex={"createTime"}
              key={"number"}
              width={150}
              render={renderCreateTime}/>}
      {props.isShowOperations &&
      <Column title={"操作"}
              key={"number"}
              width={150}
              render={renderOperations}
              align={"center"}/>}
    </Table>
  )
}

ProblemTable.defaultProps = {
  isShowCreateTime: true,
  isShowOperations: true,
  isShowTags: true
}

export default ProblemTable;