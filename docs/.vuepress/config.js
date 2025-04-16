import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { imgToElImgPlugin } from './plugins/img-to-el-img';
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'

export default defineUserConfig({
    base: '/blog-v2/',
    pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
    head: [
        ['link', { rel: 'icon', href: 'favicon.ico' }]
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'Tiamaes',
            description: 'Tiamaes Document Center',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: '天迈科技',
            description: '天迈文档中心',
        },
    },
    markdown: {
        assets: {
            absolutePathPrependBase: true
        }
    },
    plugins: [
        imgToElImgPlugin(),
        markdownImagePlugin({
            // 启用 figure
            figure: true,
            // 启用图片懒加载
            lazyload: true,
            // 启用图片标记
            mark: true,
            // 启用图片大小
            size: true,
        }),
        markdownStylizePlugin({
            // 配置项
            align: true,
            attrs: true,
            mark: true,
            spoiler: true,
            sup: true,
            sub: true,
        }),
    ],
    bundler: viteBundler(),
    theme: defaultTheme({
        logo: '/logo/logo.png',
        logoAlt: 'Tiamaes',
        repo: '',
        themePlugins: {
            // 在这里自定义主题插件
            'mediumZoom': false
        },
        locales: {
            '/': {
                selectLanguageName: 'English',
                sidebarDepth: 5,
                toggleColorMode: 'day / night',
                notFoundTitle: 'Updating, please wait a moment, make a cup of tea and rest!',
                notFound: [
                    "Life is like a box of chocolates, you never know what you're gonna get. But hey, even if it's a bitter one, swallow it with a smile and keep going!",
                    "Life is a marathon, not a sprint. It doesn't matter if you stumble or fall, as long as you keep your running shoes on and keep moving forward!",
                    "A genius is the person who repeats the most times!",
                    "It is impossible to defeat a person who never gives up!",
                    "Challenges are what make life interesting, overcoming them is what makes life meaningful.",
                    "Learn from yesterday, live for today, hope for tomorrow.",
                ],
                navbar: [
                    {
                        text: 'Home',
                        link: '/',
                    },
                    {
                        text: 'Product List',
                        link: '/en/products/VehicleScheduling.md'
                    },
                    {
                        text: 'Technical Document',
                        link: '/en/articles/VehicleScheduling.md'
                    },
                    {
                        text: 'Write Article',
                        link: '/zh/edit.md'
                    },
                ],
                sidebar: {
                    '/': [
                        {
                            text: 'All Products',
                            children: [
                                {
                                    text: 'Vehicle Scheduling',
                                    link: '/zh/产品/车载调度.md',
                                },
                                {
                                    text: '主动安全产品',
                                    link: '/zh/产品/主动安全.md',
                                },
                                {
                                    text: '智慧收银产品',
                                    link: '/zh/产品/智慧收银.md',
                                },
                                {
                                    text: '电子支付产品',
                                    link: '/zh/产品/电子支付.md',
                                },
                                {
                                    text: '车载屏类产品',
                                    link: '/zh/产品/车载屏类.md',
                                },
                                {
                                    text: '出租车产品',
                                    link: '/zh/产品/出租车.md',
                                },
                                {
                                    text: '智能座舱产品',
                                    link: '/zh/产品/智能座舱.md',
                                },
                                {
                                    text: '公交站台产品',
                                    link: '/zh/产品/公交站台.md',
                                },
                            ]
                        }
                    ],
                    '/article/': [
                        {
                            text: 'Technical Document',
                            children: [
                                {
                                    text: 'Vehicle Scheduling Products',
                                    link: '/zh/article/车载调度产品.md',
                                },
                                {
                                    text: 'Active Safety Product',
                                    link: '/zh/article/主动安全产品.md',
                                },
                                {
                                    text: 'Smart Cash Register Products',
                                    link: '/zh/article/智慧收银产品.md',
                                },
                            ]
                        }
                    ]
                },
            },
            '/zh/': {
                selectLanguageName: '简体中文',
                selectLanguageText: '选择语言',
                sidebarDepth: 5,
                editLinkText: '编辑此页',
                lastUpdatedText: '最近更新',
                contributorsText: '编辑',
                backToHome: '返回首页',
                toggleColorMode: '白天 / 黑夜',
                prev: '上一篇文章',
                next: '下一篇文章',
                Loading: '加载中',
                LoadFail: '加载失败',
                notFoundTitle: '更新中，请稍等，先泡杯茶休息一下吧！',
                notFound: [
                    '人生就像一盒巧克力，你永远不知道下一颗是什么味道，但只要你勇敢去尝，总会有惊喜等着你，哪怕有时是辣味的！',
                    '成功路上，我们都是演员，有时候得演演配角，但别忘了，你可是自己人生的主角，终有一天会大放异彩！',
                    '生活就像骑自行车，要保持平衡就得往前走。即使偶尔摔倒，也别忘了，你是在向着更美好的风景前进！',
                    '人生没有彩排，每一天都是现场直播，所以，尽情演绎吧！',
                    '无论正在经历什么，都请不要轻言放弃，因为从来没有一种坚持会被辜负。',
                    '生活总是让我们遍体鳞伤，但到后来，那些受伤的地方一定会变成我们最强壮的地方。',
                    '跌倒了并不可怕，可怕的是失去了重新站起来的勇气。',
                    '不怕路长，只怕志短；不怕缓慢，只怕常站；不怕贫穷，只怕惰懒。',
                    '梦想不会逃跑，会逃跑的永远是自己。',
                    '成功路上并没有那么拥挤，因为坚持的人并不多。'
                ],
                goBackText: '返回上一页',
                navbar: [
                    {
                        text: '首页',
                        link: '/zh/',
                    },
                    {
                        text: '产品列表',
                        link: '/zh/产品/车载调度.md'
                    },
                    {
                        text: '调试及维修',
                        link: '/zh/文章/车载调度.md'
                    },
                    {
                        text: '写文章',
                        link: '/zh/写文章/index.md'
                    },
                ],
                sidebar: {
                    '/zh/': [
                        {
                            text: '所有产品',
                            children: [
                                {
                                    text: '车载调度',
                                    link: '/zh/产品/车载调度.md',
                                },
                                {
                                    text: '主动安全',
                                    link: '/zh/产品/主动安全.md',
                                },
                                {
                                    text: '智慧收银',
                                    link: '/zh/产品/智慧收银.md',
                                },
                                {
                                    text: '电子支付',
                                    link: '/zh/产品/电子支付.md',
                                },
                                {
                                    text: '车载屏类',
                                    link: '/zh/产品/车载屏类.md',
                                },
                                {
                                    text: '出租车',
                                    link: '/zh/产品/出租车.md',
                                },
                                {
                                    text: '智能座舱',
                                    link: '/zh/产品/智能座舱.md',
                                },
                                {
                                    text: '公交站台',
                                    link: '/zh/产品/公交站台.md',
                                },
                            ]

                        },
                    ],
                    '/zh/文章/': [
                        {
                            text: '调试及维修',
                            children: [
                                {
                                    text: '车载调度产品',
                                    link: '/zh/文章/车载调度产品.md',
                                },
                                {
                                    text: '主动安全产品',
                                    link: '/zh/文章/主动安全产品.md',
                                },
                                {
                                    text: '智慧收银产品',
                                    link: '/zh/文章/智慧收银产品.md',
                                },
                            ]
                        }
                    ]
                },
                productClassification: [
                    {
                        value: '车载调度',
                        label: '车载调度产品',
                    },
                    {
                        value: '主动安全',
                        label: '主动安全产品',
                    },
                    {
                        value: '智慧收银',
                        label: '智慧收银产品',
                    },
                ],
                products: [
                {
                    value: '车载调度',
                    label: '车载调度',
                    children: [
                        {
                            value: '报站器',
                            label: '报站器',
                            children: [
                                { value: 'TM5805', label: 'TM5805' }
                            ]
                        },
                        {
                            value: '车载机',
                            label: '车载机',
                            children: [
                                { value: 'TM8606', label: 'TM8606' },
                                { value: 'TM8706', label: 'TM8706' },
                                { value: 'TM8707', label: 'TM8707' },
                                { value: 'TM8720', label: 'TM8720' },
                                { value: 'TM8721', label: 'TM8721' },
                                { value: 'TM8722', label: 'TM8722' },
                                { value: 'TM8726', label: 'TM8726' },
                                { value: 'TM8730', label: 'TM8730' },
                                { value: 'TM8731', label: 'TM8731' },
                                { value: 'TM8732', label: 'TM8732' },
                                { value: 'TM8738', label: 'TM8738' },
                                { value: 'TM8760', label: 'TM8760' },
                                { value: 'TM8765', label: 'TM8765' },
                                { value: 'TM8765N',label: 'TM8765N' },
                            ]
                        },
                        {
                            value: '调度机',
                            label: '调度机',
                            children: [
                                { value: 'TM8128', label: 'TM8128' },
                                { value: 'TM8129', label: 'TM8129' },
                                { value: 'TM8130', label: 'TM8130' },
                            ],
                        },
                        {
                            value: '通话机',
                            label: '通话机',
                            children: [
                                { value: 'TM8104', label: 'TM8104', },
                                { value: 'TM8105', label: 'TM8105',  },
                            ],
                        },
                        {
                            value: '客流',
                            label: '客流',
                            children: [
                                {  value: 'TM8206',  label: 'TM8206' },
                                {  value: 'TM8207',  label: 'TM8207' },
                                {  value: 'TM8209',  label: 'TM8209' },
                                {  value: 'TM8216',  label: 'TM8216' },
                                {  value: 'TM8217',  label: 'TM8217' },
                                {  value: 'TM8218',  label: 'TM8218' },
                                {  value: 'TM3715',  label: 'TM3715' },
                                {  value: 'TM8217-B',label: 'TM8217-B' },
                            ],
                        },
                        {
                            value: '协议转换器',
                            label: '协议转换器',
                            children: [
                                { value: 'TM2252', label: 'TM2252' }
                            ]
                        },
                        {
                            value: '全景360',
                            label: '全景360',
                            children: [
                                { value: 'TM8902', label: 'TM8902' },
                                { value: 'TM8920', label: 'TM8920' },
                            ]
                        },
                    ],
                },
                {
                    value: '主动安全',
                    label: '主动安全',
                    children: [
                        {
                            value: '主动安全',
                            label: '主动安全',
                            children: [
                                {  value: 'TM9008',  label: 'TM9008' },
                                {  value: 'TM9504-B',label: 'TM9504-B' },
                                {  value: 'TM9507',  label: 'TM9507' },
                                {  value: 'TM9507-A',label: 'TM9507-A' },
                                {  value: 'TM9608',  label: 'TM9608' },
                            ]
                        },
                        {
                            value: '酒精测试',
                            label: '酒精测试',
                            children: [
                                { value: 'TM9603', label: 'TM9603' },
                            ]
                        }
                    ]
                }]
            }
        }
    })
})