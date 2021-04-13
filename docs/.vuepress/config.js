module.exports = {
    
    title: "Liaowq",
    theme: 'reco',
    description: '前端工程师，记录学习的脚步',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['script',{}, `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?9c279da92a4d49aea2ae2a2b0cb96950";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
        `]
    ],
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '动态', link: '/timeline/', icon: 'reco-date' }
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
                        { title: '枚举', path: 'enum' },
                        { title: '类', path: 'class' },
                        { title: '类与接口', path: 'class-and-interfaces' },
                        { title: '泛型', path: 'generics' },
                        { title: '声明合并', path: 'declaration-merging' }
                        
                    ]
                }
            ],
            '/js/':[
                {
                    title: '简介',
                    collapsable: false,
                    path: '/js/'
                },
                {
                    title: '变量、作用域和内存问题',
                    collapsable: false,
                    children: [
                        { title: '原始数据类型', path: 'primitive-data-types' },            
                        { title: '基本类型和引用类型', path: 'common-quote-type' },     
                        { title: '上下文和作用域', path: 'scope' },  
                        { title: '垃圾回收', path: 'garbage-collection' },   
                        { title: 'Date&RegExp', path: 'Date' }, 
                        { title: '单例内置对象', path: 'Global' }, 
                        { title: '原始值包装类型', path: 'primitive-package-type' },    
                        { title: 'Object&Array', path: 'Object' },  
                        { title: 'Map', path: 'aboutMap' },   
                        { title: 'WeakMap', path: 'aboutWeakMap' }, 
                    ]
                }
            ],
            '/es/':[
                {
                    title: '简介',
                    collapsable: false,
                    path: '/es/'
                },
                {
                    title: '基础',
                    collapsable: false,
                    children: [
                        { title: '原始数据类型', path: 'var-let-const' },          
                    ]
                }
            ]
        },
        repo: 'LuffyLiao/LuffyLiao.github.io',
        repoLabel: 'GitHub',
        docsBranch: 'master',
        lastUpdated: 'Last Updated',
        type: 'blog',
        authorAvatar: '/logo.png',
        author: 'Liaowq',
        // 博客配置
        blogConfig: {
            category: {
                location: 2,      // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/LuffyLiao' },
                { icon: 'reco-mail', link: 'mentorbro1@gmail.com' }
            ]
        },
        modePicker: false 
    }
}