// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    future: {
        experimental_faster: true,
    },
    title: 'ArTeam',
    url: 'https://docs.arteam.dev',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'ignore',
    favicon: 'img/arteam_logo.png',

    organizationName: 'ArTeamTech',
    projectName: 'Arteam-Plugin-Docs',

    i18n: {
        defaultLocale: 'zh-CN',
        locales: ['zh-CN'],
    },
    clientModules: [
        require.resolve('./src/clientModules/routeModules.js'),
        require.resolve('./src/clientModules/fixNavbar.js'),
        require.resolve('./src/clientModules/scrollNavbar.js'),
    ],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js')
                },
                blog: {
                    showReadingTime: true
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'arlibs',
                path: 'docs-arlibs',
                routeBasePath: 'arlibs',
                sidebarPath: require.resolve('./sidebars-arlibs.js'),
            },
        ],
        'docusaurus-plugin-image-zoom'
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            giscus: {
                repo: 'ArTeamTech/Arteam-Plugin-Docs',
                repoId: 'R_kgDOOr8qNw',
                category: 'General',
                categoryId: 'DIC_kwDOOr8qN84CqSZ7'
            },
            zoom: {
                selector: '.markdown :not(em) > img',
                background: {
                    light: 'rgb(255, 255, 255)',
                    dark: 'rgb(50, 50, 50)',
                },
            },
            navbar: {
                title: 'ArTeam',
                logo: {
                    alt: 'ArTeam Logo',
                    src: 'img/arteam_logo.png',
                },
                items: [
                    {
                        label: '文档',
                        type: 'doc',
                        docId: 'about',
                        position: 'left',
                    },
                    {
                        to: '/blog/',
                        label: '博客',
                        position: 'left'
                    },
                    {
                        to: '/download/',
                        label: '下载',
                        position: 'left',
                    },
                    {
                        href: 'https://github.com/ArTeamTech',
                        position: 'right',
                        className: 'header-github-link',
                    },
                ],
            },
            colorMode: {
                defaultMode: 'light',
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
            footer: {
                style: 'light',
                links: [
                    {
                        title: '文档',
                        items: [
                            {
                                label: 'ArTeam 主页',
                                to: 'https://arteam.dev',
                            },
                            {
                                label: 'ArLibs',
                                to: '/Arlibs',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/ArTeamTech/Arteam-Plugin-Docs',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} <b>ArTeam</b>, All Rights Reserved.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),

    themes: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                hashed: true,
                language: ["en", "zh"],
            }),
        ],
    ],
};

module.exports = config;