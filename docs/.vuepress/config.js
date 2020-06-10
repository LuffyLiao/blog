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
                        { title: '声明文件', path: 'declaration-files' },
                        { title: '内置对象', path: 'built-in-objects' },
                        { title: '类型别名', path: 'type-aliases' },
                        { title: '字符串字面量类型', path: 'string-literal-types' },
                        { title: '元祖', path: 'tuple' },
                        
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