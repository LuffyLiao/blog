module.exports = {
    title: 'Liaowq',
    description: '前端工程师，记录学习的脚步',
    head: [['link', { rel: 'icon', href: '/favicon.png' }]],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'TypeScript', link: '/ts/' }
        ],
        sidebar: {
            '/ts/': [
                {
                    title: '简介',
                    collapsable: false,
                    path: '/ts/'
                },
                {
                    title: '基础',
                    collapsable: false,
                    children: [
                        { title: '原始数据类型', path: 'primitive-data-types' },
                        { title: '任意值', path: 'any' },
                        { title: '类型推论', path: 'type-inference' }
                    ]
                }
            ]
        },
        repo: 'LuffyLiao/LuffyLiao.github.io',
        repoLabel: 'GitHub',
        docsBranch: 'master',
        lastUpdated: 'Last Updated'
    }
}