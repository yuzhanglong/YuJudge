import React, {useEffect, useState} from "react";
import {Button, Select, Modal} from "antd";
import {InfoOutlined} from '@ant-design/icons';
import LanguageTip from "./LanguageTip";
import {LanguageTypeEnum} from "../../../../common/enumerations";
import {C_PLUS_PLUS_NICK_NAME} from "../../../../common/programLanguage";

interface LanguageSelectorProps {
  allowedLanguage: string[];
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = (props) => {

  // 语言提示对话框是否可见
  const [languageTipVisible, setLanguageTipVisible] = useState<boolean>(false);
  // 支持的语言
  const [languages, setLanguages] = useState<string[]>([]);
  // 当前选中的语言
  const [currentLanguage, setCurrentLanguage] = useState<string | undefined>(undefined);


  useEffect(() => {
    setLanguages(props.allowedLanguage);
    setCurrentLanguage(props.allowedLanguage.length ? props.allowedLanguage[0] : undefined);
  }, [props.allowedLanguage]);


  // 语言提示按钮被按下
  const onLanguageSelectorTipButtonClick = () => {
    setLanguageTipVisible(true);
  }

  // 选择器内容发生改变
  const onSelectorChange = (value: string) => {
    props.onLanguageChange(value);
    setCurrentLanguage(value);
  }

  // 渲染选择器组件
  const renderSelector = (allowedLanguage: string[]) => {
    return allowedLanguage.map(res => {
      return (
        <Select.Option
          value={res}
          key={res}>
          {res === LanguageTypeEnum.C_PLUS_PLUS ? C_PLUS_PLUS_NICK_NAME : res}
        </Select.Option>
      )
    })
  }

  return (
    <div>
      <Button shape="circle"
              icon={<InfoOutlined/>}
              size={"small"}
              disabled={!currentLanguage}
              onClick={onLanguageSelectorTipButtonClick}>
      </Button>
      <Select
        style={{
          width: 120,
          paddingLeft: 10
        }}
        value={currentLanguage}
        placeholder={"请选择"}
        size={"small"} onChange={onSelectorChange}>
        {renderSelector(languages)}
      </Select>
      <Modal
        title="语言提示"
        visible={languageTipVisible}
        onCancel={() => setLanguageTipVisible(false)}
        footer={null}>
        <LanguageTip language={currentLanguage}/>
      </Modal>
    </div>
  )
}

export default LanguageSelector;