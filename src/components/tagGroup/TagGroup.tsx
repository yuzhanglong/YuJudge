/*
 * File: TagGroup.tsx
 * Description: 标签编辑组件
 * Created: 2020-08-15 13:25:20
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useState} from 'react';
import {Input, Tag} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

interface TagGroupProps {
  initTags: string[];
  isRefuseLastTagClose?: boolean;
  onTagAdd?: (addValue: string[]) => void;
  onTagRemove?: (removeIndex: number) => void;
}

const TagGroup: React.FunctionComponent<TagGroupProps> = (props) => {
  const [isShowAddInput, setIsShowAddInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  // 当输入框失去焦点时，我们准备添加标签
  const onInputBlur = () => {
    if (inputValue && inputValue !== '' && props.onTagAdd) {
      let res: string[] = [];
      res.push(...props.initTags);
      res.push(inputValue);
      props.onTagAdd(res);
    }
    // 把输入框的内容置为空
    setInputValue('');
    setIsShowAddInput(false);
  }

  // 输入框文本发生改变
  const onInputChange = (event: any) => {
    event.persist();
    setInputValue(event.target.value);
  }

  // 当标签的关闭按钮被单击
  const onCloseButtonOnTagCLick = (removeIndex: number) => {
    if (props.onTagRemove) {
      props.onTagRemove(removeIndex);
    }
  }

  // 渲染所有标签
  const renderInitTags = () => {
    const totalSize = props.initTags.length;
    let res = [];
    for (let i = 0; i < totalSize; i++) {
      // 当用户设置不允许最后一个标签被删除
      const closeable = props.isRefuseLastTagClose && totalSize !== 1;
      res.push(
        // 当所有的标签小于
        <Tag
          key={i}
          closable={closeable}
          visible
          onClose={() => onCloseButtonOnTagCLick(i)}
          style={{
            marginBottom: 10
          }}>
          {props.initTags[i]}
        </Tag>
      );
    }
    return res;
  }

  return (
    <div>
      {renderInitTags()}
      {
        isShowAddInput &&
        <Input
          autoFocus
          onBlur={() => onInputBlur()}
          onChange={onInputChange}
          style={{
            width: 78,
            marginRight: 8,
            verticalAlign: 'top'
          }}
          type="text"
          size="small"
        />
      }
      {
        !isShowAddInput &&
        <Tag onClick={() => setIsShowAddInput(true)}>
          <PlusOutlined/> 添加一个标签
        </Tag>
      }
    </div>
  )
}

TagGroup.defaultProps = {
  isRefuseLastTagClose: false
}

export default TagGroup;