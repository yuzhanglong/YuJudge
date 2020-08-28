/*
 * File: loadable.ts
 * Description: 懒加载组件包装
 * Created: 2020-8-27 13:57:48
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import Loadable from 'react-loadable';


export default (loader: any) => {
  return Loadable({
    loader: () => loader,
    loading: () => null
  });
}