import React, { useContext } from 'react'
import { LanguageTypeEnum } from '../../../../common/enumerations'
import { C_PLUS_PLUS_NICK_NAME, PROGRAM_LANGUAGE_SCRIPT_CONTENT } from '../../../../common/programLanguage'
import { LocalContext } from '../../../../components/localContext/LocalContext'


interface LanguageTipProps {
  language?: string;
}


const LanguageTip: React.FunctionComponent<LanguageTipProps> = (props) => {
// local
  const localContext = useContext(LocalContext)
  // 渲染编程语言的执行脚本内容
  const renderLanguageScript = (language: string | undefined) => {
    if (!language) {
      return
    }
    return PROGRAM_LANGUAGE_SCRIPT_CONTENT[language]
  }

  return (
    <div>
      <p>
        ${localContext.languageTip.languageName}: {props.language === LanguageTypeEnum.C_PLUS_PLUS ? C_PLUS_PLUS_NICK_NAME : props.language}
      </p>
      <p>
        ${localContext.languageTip.compileScript}: {renderLanguageScript(props.language)}
      </p>
    </div>
  )
}

export default LanguageTip
