module.exports = {
  title: 'YuJudge',
  tagline: 'Enjoy Coding And Get Happiness',
  url: 'http://YuJudge.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'yuzhanglong',
  projectName: 'YuJudge',
  themeConfig: {
    navbar: {
      title: 'YuJudge',
      logo: {
        alt: 'YuJudge',
        src: 'http://cdn.yuzzl.top/yu_judge_logo.png',
      },
      items: [
        {
          to: '/',
          activeBasePath: 'docs',
          label: '文档',
          position: 'left',
        },
        {
          to: 'http://oj.yuzzl.top',
          activeBasePath: 'docs',
          label: 'DEMO',
          position: 'left',
        },
        {
          href: 'https://github.com/yuzhanglong/YuJudge',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {
              label: '前端(React + TypeScript)',
              href: 'https://github.com/yuzhanglong/YuJudge',
            },
            {
              label: '服务端(SpringBoot)',
              href: 'https://github.com/yuzhanglong/YuJudge-JudgeServer',
            },
            {
              label: '判题服务器(SpringBoot)',
              href: 'https://github.com/yuzhanglong/YuJudge-JudgeHost',
            },
            {
              label: '判题核心(C, Base Linux)',
              href: 'https://github.com/yuzhanglong/YuJudge-Core',
            },
          ],
        },
        {
          title: '参考',
          items: [
            {
              label: '测试DEMO',
              href: 'http://oj.yuzzl.top/',
            },
            {
              label: 'CODE SANDBOX DEMO',
              href: 'https://codesandbox.io/s/adoring-blackburn-ru7kr',
            },
          ],
        },
        {
          title: '更多信息',
          items: [
            {
              label: 'My GitHub',
              href: 'https://github.com/yuzhanglong',
            },
          ],
        },
      ],
      copyright: 'Code By YuZhangLong. Built with Docusaurus.',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/yuzhanglong/YuJudge/blob/master/docs',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
