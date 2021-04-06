/*
 * File: index.ts
 * Description: 全局状态管理
 * Created: 2020-8-29 12:32:36
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {createStore} from 'redux';
import reducer from './reducer';

export default createStore(reducer);