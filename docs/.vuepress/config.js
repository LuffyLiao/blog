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
                        { title: '类型推论', path: 'type-inference' },
                        { title: '联合类型', path: 'union-types' },
                        { title: '接口', path: 'type-of-object-interfaces' },
                        { title: '数组的类型', path: 'type-of-array' },
                        { title: '函数的类型', path: 'type-of-function' },
                        { title: '类型断言', path: 'type-assertion' },
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