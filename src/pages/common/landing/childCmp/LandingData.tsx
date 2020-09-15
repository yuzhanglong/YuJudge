/*
 * File: LandingData.tsx
 * Description: 着陆页底部数据
 * Created: 2020-8-31 20:01:07
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from 'react';

// 底部数据源
export const LandingFooterDataSource = {
  wrapper: {className: 'home-page-wrapper footer1-wrapper'},
  OverPack: {className: 'footer1', playScale: 0.2},
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children: 'YuJudge',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: 'To be the best OnlineJudge',
            },
          ],
        },
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <span>
              <p>源代码</p>
            </span>
          ),
        },
        childWrapper: {
          children: [
            {name: 'link0', href: 'https://github.com/yuzhanglong/YuJudge', children: '前端项目(React + TypeScript)'},
            {name: 'link1', href: 'https://github.com/yuzhanglong/YuJudge-JudgeServer', children: '服务端项目(SpringBoot)'},
            {name: 'link1', href: 'https://github.com/yuzhanglong/YuJudge-JudgeHost', children: '判题服务器(SpringBoot)'},
            {name: 'link2', href: 'https://github.com/yuzhanglong/YuJudge-Core', children: '判题核心(C, base Linux)'}
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: {children: '相关资料'},
        childWrapper: {
          children: [
            {href: 'http://docs.yuzzl.top', name: 'link0', children: '项目介绍文档'},
            {href: 'http://docs.yuzzl.top', name: 'link1', children: '二次开发'},
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: {children: '其他'},
        childWrapper: {
          children: [
            {href: 'mailto:yuzl1123@163.com', name: 'link0', children: 'My Email'},
            {href: 'https://github.com/yuzhanglong', name: 'link1', children: 'My GitHub'},
          ],
        },
      },
    ],
  },
  copyrightWrapper: {className: 'copyright-wrapper'},
  copyrightPage: {className: 'home-page'},
  copyright: {
    className: 'copyright',
    children: (
      <span>
        人的生命，似洪水奔流，不遇着岛屿和暗礁，难以激起美丽的浪花。
      </span>
    ),
  },
};