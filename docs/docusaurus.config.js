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
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/yuzhanglong',
            },
          ],
        },
      ],
      copyright: `Code By YuZhangLong. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/yuzhanglong/YuJudge',
          routeBasePath: "/"
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
