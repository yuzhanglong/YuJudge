/*
 * File: MarkdownEditor.tsx
 * Description: Markdown编辑器
 * Created: 2020-9-10 14:05:42
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from 'react';
import {Card, Input} from 'antd';
import style from './markdownEditor.module.scss';
import BetterMarkdown from '../betterMarkdown/BetterMarkdown';
import classNames from 'classnames';
import {FullscreenExitOutlined, FullscreenOutlined} from '@ant-design/icons';

interface MarkdownEditorProps {
  value: string;
  onValueChange?: (data: string) => void;
}

const MarkdownEditor: React.FunctionComponent<MarkdownEditorProps> = (props) => {

  // 内容
  const [markdownValue, setMarkdownValue] = useState<string>('');

  // 是否全屏
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);


  useEffect(() => {
    setMarkdownValue(props.value);
  }, [props.value]);

  // 输入框内容被改变
  const onInputChange = (event: any) => {
    event.persist();
    const v: string = event.target.value;
    setMarkdownValue(v);
    if (props.onValueChange) {
      props.onValueChange(v);
    }
  }

  // 包裹卡片类名
  const wrapClassName = classNames(style.editor_wrap, {
    [style.editor_wrap_full_screen]: isFullScreen
  });

  // 渲染顶部工具栏
  const renderToolBar = () => {
    const screenButtonProps = {
      onClick: () => setIsFullScreen(!isFullScreen)
    }
    return (
      <div>
        {isFullScreen ? <FullscreenExitOutlined {...screenButtonProps}/> : <FullscreenOutlined {...screenButtonProps}/>}
      </div>
    )
  }

  return (
    <Card
      extra={renderToolBar()}
      className={wrapClassName}
      bodyStyle={{padding: 0}}>
      <div className={!isFullScreen ? style.editor_main : style.editor_main_full_screen}>
        <div className={style.editor_edit}>
          <Input.TextArea
            onChange={(event) => onInputChange(event)}
            value={markdownValue}
            className={style.editor_edit_input}
            autoSize={true}
            bordered={false}/>
        </div>
        <div className={style.editor_divider}/>
        <div className={style.editor_preview}>
          <BetterMarkdown data={markdownValue}/>
        </div>
      </div>
    </Card>
  )
}

export default MarkdownEditor;