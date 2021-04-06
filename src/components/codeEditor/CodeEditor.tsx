/*
 * File: CodeEditor.tsx
 * Description: 代码编辑器
 * Created: 2020-8-26 16:51:11
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from 'react';
import SubmitToolBar from '../submitToolBar/SubmitToolBar';
import LanguageSelector from '../../pages/common/problemHome/childCmp/LanguageSelector';
import style from './codeEditor.module.scss'
import {message} from 'antd';
import {DEFAULT_LANGUAGE} from '../../config/config';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/xq-light.css';

interface CodeEditorProps {
  allowedLanguage: string[];
  defaultValue?: string;
  onSubmit: (language: string, code: string) => void;
}

const CodeEditor: React.FunctionComponent<CodeEditorProps> = (props) => {
  // 语言选择器中活跃的语言
  const [activeLanguage, setActiveLanguage] = useState<string>();

  // 代码内容
  const [codeContent, setCodeContent] = useState<string>('');

  // 提交代码
  const onSubmit = () => {
    if (activeLanguage) {
      props.onSubmit(activeLanguage, codeContent);
    }
  }

  // 初始化 activeLanguage
  useEffect(() => {
    if (props.allowedLanguage && props.allowedLanguage.length) {
      setActiveLanguage(props.allowedLanguage[0]);
    } else {
      setActiveLanguage(DEFAULT_LANGUAGE[0]);
    }
  }, [props.allowedLanguage]);


  // 清空按钮被按下
  const onClearButtonClick = () => {
    setCodeContent('');
    message.success('代码区已清空');
  }

  return (
    <div className={style.code_editor}>
      <div className={style.code_editor_language_selector}>
        <LanguageSelector
          onLanguageChange={(res) => setActiveLanguage(res)}
          allowedLanguage={
            props.allowedLanguage && props.allowedLanguage.length
              ? props.allowedLanguage
              : DEFAULT_LANGUAGE
          }/>
      </div>
      <div className={style.code_editor_editor_wrap}>
        <CodeMirror
          className={style.code_mirror}
          value={codeContent}
          onChange={(editor, data, value) => setCodeContent(value)}
          options={{
            mode: 'xml',
            theme: 'xq-light',
            lineNumbers: true
          }}
        />
      </div>
      <div className={style.code_editor_submit_tools}>
        <SubmitToolBar
          onSubmit={() => onSubmit()}
          onClear={() => onClearButtonClick()}
          isButtonActive={codeContent != null && codeContent !== ''}/>
      </div>
    </div>
  )
}

export default CodeEditor;