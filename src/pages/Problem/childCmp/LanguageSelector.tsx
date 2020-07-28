import React from "react";
import {Button, Select} from "antd";
import {InfoOutlined} from '@ant-design/icons';

interface LanguageSelectorProps {
  allowedLanguage: string[];
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = (props) => {

  const renderSelector = (allowedLanguage: string[]) => {
    return allowedLanguage.map(res => {
      return <Select.Option
        value={res}
        key={res}>
        {res === "C_PLUS_PLUS" ? "C++" : res}
      </Select.Option>
    })
  }

  const onSelectorChange = (value: string) => {
    props.onLanguageChange(value);
  }

  return (
    <div>
      <Button shape="circle" icon={<InfoOutlined/>} size={"small"}></Button>
      <Select placeholder={"请选择"}
              style={{width: 120, paddingLeft: 10}}
              size={"small"} onChange={onSelectorChange}>
        {renderSelector(props.allowedLanguage)}
      </Select>
    </div>
  )
}

export default LanguageSelector;