// @ts-nocheck

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  arlibsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'ArLibs 介绍'
    },
    {
      type: 'category',
      label: '当前功能',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'logger',
          label: '日志系统'
        },
        {
          type: 'doc',
          id: 'color',
          label: '颜色工具'
        },
        {
          type: 'doc',
          id: 'command-api',
          label: '命令模块'
        },
        {
          type: 'doc',
          id: 'config-api',
          label: '配置模块'
        }
      ]
    },
    {
      type: 'category',
      label: '计划功能',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'config',
          label: '配置模块'
        },
        {
          type: 'doc',
          id: 'language',
          label: '语言模块'
        },
        {
          type: 'doc',
          id: 'database',
          label: '数据库模块'
        }
      ]
    }
  ],
};

module.exports = sidebars; 