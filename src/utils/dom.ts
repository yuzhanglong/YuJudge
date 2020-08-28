/*
 * File: dom.tsx
 * Description: DOM操作
 * Created: 2020-8-28 23:25:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";

import Loading from "../components/loading/Loading";
import ReactDOM from "react-dom";
import {LOADING_DOM_ID} from "../config/config";


// 展示一个全局loading, 依赖自定义的组件
export const showLoading = () => {
  let dom = document.createElement('div');
  dom.setAttribute('id', LOADING_DOM_ID);
  document.body.appendChild(dom);
  const content = React.createElement(Loading, null);
  ReactDOM.render(
    content,
    document.getElementById(LOADING_DOM_ID)
  );
}

// 移除全局loading
export const removeLoading = () => {
  const element = document.getElementById(LOADING_DOM_ID);
  if (element) {
    document.body.removeChild(element);
  }
}

