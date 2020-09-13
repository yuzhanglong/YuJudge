module.exports = {
  title: 'YuJudge',
  tagline: 'Enjoy Coding And Get Happiness',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'YuZhangLong', // Usually your GitHub org/user name.
  projectName: 'YuJudge', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'YuJudge',
      logo: {
        alt: 'YuJudge',
        src: 'http://cdn.yuzzl.top/yu_judge_logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: '文档',
          position: 'left',
        },
        {
          href: 'https://github.com/yuzhanglong',
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
          items: [
            {
              label: 'Web(前端)',
              to: '/docs/API',
            },
            {
              label: 'JudgeServer(服务端)',
              to: '/docs/API',
            },
            {
              label: 'JudgeHost(判题服务器)',
              to: '/docs/API',
            },
            {
              label: 'JudgeCore(判题核心)',
              to: '/docs/API',
            },
          ],
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
              href: 'https://github.com',
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
            'https://github.com',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
