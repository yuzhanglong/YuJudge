import React, {useState} from "react";
import {Button, Select, Modal} from "antd";
import {InfoOutlined} from '@ant-design/icons';
import LanguageTip from "./LanguageTip";

interface LanguageSelectorProps {
  allowedLanguage: string[];
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = (props) => {
  const [selectLanguage, setSelectLanguage] = useState<any>();

  const [languageTipVisible, setLanguageTipVisible] = useState<boolean>(false);

  const renderSelector = (allowedLanguage: string[]) => {
    return allowedLanguage.map(res => {
      return (
        <Select.Option
          value={res}
          key={res}>
          {res === "C_PLUS_PLUS" ? "C++" : res}
        </Select.Option>
      )
    })
  }

  const onLanguageSelectorTipButtonClick = () => {
    setLanguageTipVisible(true);
  }

  const onSelectorChange = (value: string) => {
    props.onLanguageChange(value);
    setSelectLanguage(value);
  }

  return (
    <div>
      <Button shape="circle"
              icon={<InfoOutlined/>}
              size={"small"} disabled={!selectLanguage}
              onClick={onLanguageSelectorTipButtonClick}>
      </Button>
      <Select style={{width: 120, paddingLeft: 10}} placeholder={"请选择"}
              size={"small"} onChange={onSelectorChange}>
        {renderSelector(props.allowedLanguage)}
      </Select>
      <Modal
        title="语言提示"
        visible={languageTipVisible}
        onCancel={() => setLanguageTipVisible(false)}
        footer={null}>
        <LanguageTip language={selectLanguage}></LanguageTip>
      </Modal>
    </div>
  )
}

export default LanguageSelector;