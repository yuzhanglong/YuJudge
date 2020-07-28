import React from "react";
import {LanguageType} from "../../../core/enumerations/languageTypeEnum";


interface LanguageTipProps {
  language: LanguageType
}


const LanguageTip: React.FunctionComponent<LanguageTipProps> = (props) => {
  const renderLanguageScript = (language: LanguageType) => {
    switch (language) {
      case LanguageType.C:
        return "gcc -Wall -O2 -std=gnu11 CODE_PATH -o run -lm";
      case LanguageType.C_PLUS_PLUS:
        return "g++ -Wall -O2 CODE_PATH -o run";
      case LanguageType.JAVA:
        return "java Main >> run";
      case LanguageType.PYTHON:
        return "echo 'python3 CODE_PATH' >> run";
    }
  }
  return (
    <div>
      <p>语言名称: {props.language === LanguageType.C_PLUS_PLUS ? "C++" : props.language}</p>
      <p>编辑脚本: {renderLanguageScript(props.language)}</p>
    </div>
  )
}

export default LanguageTip;