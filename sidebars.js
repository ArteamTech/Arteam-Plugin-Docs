/**
 * 创建侧边栏可以让你：
 - 创建一个有序的文档组
 - 为该组的每个文档渲染侧边栏
 - 提供上下导航

 侧边栏可以从文件系统生成，也可以在这里明确定义。

 可以创建任意数量的侧边栏。
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'about',
      label: '关于'
    },
  ],
};

module.exports = sidebars;
