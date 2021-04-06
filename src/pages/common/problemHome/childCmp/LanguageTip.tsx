import React from 'react';
import {LanguageTypeEnum} from '../../../../common/enumerations';
import {C_PLUS_PLUS_NICK_NAME, PROGRAM_LANGUAGE_SCRIPT_CONTENT} from '../../../../common/programLanguage';


interface LanguageTipProps {
  language?: string;
}


const LanguageTip: React.FunctionComponent<LanguageTipProps> = (props) => {

  // 渲染编程语言的执行脚本内容
  const renderLanguageScript = (language: string | undefined) => {
    if (!language) {
      return;
    }
    return PROGRAM_LANGUAGE_SCRIPT_CONTENT[language];
  }

  return (
    <div>
      <p>语言名称: {props.language === LanguageTypeEnum.C_PLUS_PLUS ? C_PLUS_PLUS_NICK_NAME : props.language}</p>
      <p>编辑脚本: {renderLanguageScript(props.language)}</p>
    </div>
  )
}

export default LanguageTip;