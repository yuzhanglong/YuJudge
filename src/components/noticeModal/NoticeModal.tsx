/*
 * File: NoticeModal.tsx
 * Description: 公告对话框
 * Created: 2020-9-11 11:23:45
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Modal} from "antd";
import {NoticeInfo} from "../../models/notice";
import BetterMarkdown from "../betterMarkdown/BetterMarkdown";
import style from "./noticeModal.module.scss";
import {DEFAULT_DATE_TIME_FORMAT} from "../../config/config";
import moment from "moment";
import {UserOutlined} from "@ant-design/icons";

interface NoticeModalProps {
  visible: boolean;
  notice?: NoticeInfo;
  onClose?: () => void;
}

const NoticeModal: React.FunctionComponent<NoticeModalProps> = (props) => {

  // 窗口关闭
  const onModalClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Modal
      title={props.notice?.title}
      footer={false}
      visible={props.visible}
      onCancel={() => onModalClose()}>
      <div className={style.notice_author}>
        <UserOutlined />{props.notice?.creator.nickname} / {moment(props.notice?.createTime).format(DEFAULT_DATE_TIME_FORMAT)}
      </div>
      <BetterMarkdown data={props.notice?.content}/>
    </Modal>
  )
}

export default NoticeModal;