/*
 * File: DangerSettings.tsx
 * Description: 危险项设置
 * Created: 2020-9-13 11:08:30
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React, { useContext } from 'react'
import style from '../settings.module.scss'
import EditorTip from '../../../../components/editorTip/editorTip'
import { Button, Card, Divider } from 'antd'
import { LocalContext } from '../../../../components/localContext/LocalContext'

interface DangerSettingsProps {
  isCheckCodeOpen: boolean;
  resetCheckCodeOpenCondition: () => void;
}

const DangerSettings: React.FunctionComponent<DangerSettingsProps> = (props) => {
  // local
  const localContext = useContext(LocalContext)

  return (
    <Card title={<div className={style.cms_settings_edit_item_title_danger}>
      {localContext.settingPage.dangerZoneTitle}
    </div>}>
      <EditorTip
        title={`${localContext.settingPage.checkCodeInfo}`}
        content={`${localContext.settingPage.checkCodeDetail} ${localContext.current}: ${props.isCheckCodeOpen ? localContext.open : localContext.close}`}>
        <Button danger onClick={() => props.resetCheckCodeOpenCondition()}>
          {props.isCheckCodeOpen ? `${localContext.close}` : `${localContext.open}`}
        </Button>
      </EditorTip>
      <Divider />
      <EditorTip
        title={localContext.settingPage.closeAll}
        content={localContext.settingPage.closeAllInfo}>
        <Button danger disabled>
          {localContext.close}
        </Button>
      </EditorTip>
    </Card>
  )
}

export default DangerSettings
