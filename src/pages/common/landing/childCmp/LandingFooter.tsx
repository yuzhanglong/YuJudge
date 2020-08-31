/*
 * File: LandingFooter.tsx
 * Description: 着陆页页底
 * Created: 2020-8-31 19:57:39
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import {Button, Col, Row} from 'antd';
import {LandingFooterDataSource} from "./LandingData";

interface LandingFooterProps {

}

const LandingFooter: React.FunctionComponent<LandingFooterProps> = (props) => {

  const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;

  const getChildrenToRender = (item: any, i: any) => {
    let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
    tag = item.href ? 'a' : tag;
    let children = typeof item.children === 'string' && item.children.match(isImg)
      ? React.createElement('img', {src: item.children, alt: 'img'})
      : item.children;
    if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
      children = React.createElement(Button, {
        ...item.children
      });
    }
    return React.createElement(tag, {key: i.toString(), ...item}, children);
  };
  const getLiChildren = (data: any[]) => data.map((item, i) => {
    const {title, childWrapper, ...itemProps} = item;
    return (
      <Col key={i.toString()} {...itemProps} title={null} content={null}>
        <h2 {...title}>
          {typeof title.children === 'string' &&
          title.children.match(isImg) ? (
            <img src={title.children} width="100%" alt="img"/>
          ) : (
            title.children
          )}
        </h2>
        <div {...childWrapper}>
          {childWrapper.children.map(getChildrenToRender)}
        </div>
      </Col>
    );
  });

  const dataSource = LandingFooterDataSource;
  const childrenToRender = getLiChildren(dataSource.block.children);
  return (
    <div {...props} {...dataSource.wrapper}>
      <OverPack {...dataSource.OverPack}>
        <QueueAnim
          type="bottom"
          key="ul"
          leaveReverse
          component={Row}
          {...dataSource.block}
        >
          {childrenToRender}
        </QueueAnim>
        <TweenOne
          animation={{y: '+=30', opacity: 0, type: 'from'}}
          key="copyright"
          {...dataSource.copyrightWrapper}
        >
          <div {...dataSource.copyrightPage}>
            <div {...dataSource.copyright}>
              {dataSource.copyright.children}
            </div>
          </div>
        </TweenOne>
      </OverPack>
    </div>
  )
}

export default LandingFooter;
