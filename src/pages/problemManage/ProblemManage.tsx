import React, {useEffect, useState} from "react";
import {getProblems} from "../../network/problemRequests";
import {Table, Tag, Button} from "antd";
import {timestampToDateTime} from "../../utils/DateTimeUtil";
import {ColumnType} from "antd/lib/table";

const ProblemManage: React.FunctionComponent = () => {
  // 问题创建时间
  const renderCreateTime = (timeStamp: number) => {
    return (<div>{timestampToDateTime(timeStamp)}</div>)
  }

  // 渲染标签
  const renderTags = (tags: string[]) => {
    return (
      <div>
        {tags.map(tag => {
          return (
            <Tag color={"#409eff"} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </div>
    )
  }

  // 渲染操作相关
  const renderOperations = () => {
    return (
      <Button type="link">编辑问题</Button>
    )
  }

  // 表头配置
  const columns: ColumnType<any>[] = [
    {
      title: '题号',
      dataIndex: 'id',
      key: 'number',
      width: 150
    },
    {
      title: '问题名称',
      dataIndex: 'name',
      key: 'name',
      width: 500
    },
    {
      title: '标签',
      key: 'characterTags',
      dataIndex: 'characterTags',
      render: renderTags,
      width: 250
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: renderCreateTime,
    },
    {
      title: '操作',
      key: 'operation',
      render: renderOperations,
      align: "center"
    },
  ];

  // states
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 请求problem
  useEffect(() => {
    setIsLoading(true);
    getProblems(0, 40)
      .then(res => {
        setProblems(res.data);
        setIsLoading(false);
      })
  }, []);

  return (
    <Table columns={columns}
           className={"cms_proble_pable"}
           dataSource={problems}
           rowKey={"id"}
           loading={isLoading}>
    </Table>
  )
}

export default ProblemManage;