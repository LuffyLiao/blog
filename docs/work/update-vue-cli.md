---
title: vue-cli2.x 升级至4.x
date: 2021-03-23 11:37:14
sidebar: 'auto'
categories: 
 - vue
 - 日常记录 
tags: 
 - vue vue-cli
---

## vue-cli2.x升级到4.x
---
### 安装Vue Cli 4
1. 按照[官方文档]()安装
2. 安装成功后检查当前版本，如下则证明安装成功  

![alt 属性文本](https://cdn.nlark.com/yuque/0/2020/png/1152594/1600758734409-7dbc37c9-d077-4cc9-8d52-dc85cedd5154.png)

### 创建新项目
1. 因为在旧项目中直接升级会比较混乱，不利于排查问题。所以新建了一个项目，将旧项目的内容迁移到新项目
2. 创建一个新项目 `vue create wiki-vue-clie4`

### 迁移static静态资源
1. 由于vue-cli 3 以后静态资源都放在 `/public/` 目录下，所以需要将原来 `/static/` 目录下的静态资源全部复制到 `/public/` 目录下
2. 同理，`index.html` 复制到 `/public/index.html` 中

### 迁移src目录
1. 这里比较简单粗暴，直接将原来的 `/src/` 文件夹复制到新项目根目录即可

### 迁移package.json
1. 由于旧项目中的  `/package.json/` 中有些依赖是不必要的，所以迁移完以上内容后 `npm install` 安装目录
2. 根据报错提示安装所缺少的依赖包

### 创建 vue.config.js，迁移配置
1. Vue CLI 3以后，官方推荐零配置搭建项目，所以原来 `/build/`  和  `/config/`  目录中的项目配置都会在 `vue.config.js` 文件中去实现。
2. 并且这个文件默认是不被自动创建的，所以需要在根目录中先创建 `vue.config.js`
    - 首先在文件中添加顶层内容 module.exports = { }
    - 接着引入`path`模块，在chainWebpack中配置全局映射路径 ,迁移原来 `build/webpack.base.conf.js` 中的alias配置
    ```javascript
    const path = require('path')

    // 获取绝对路径
    function resolve (dir) {
        return path.join(__dirname, dir)
    }
    module.exports = {
        chainWebpack: (config) => {
        // 配置映射
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('_ASET_', resolve('src/assets'))
            .set('_COMP_', resolve('src/components'))
            .set('_PAGE_', resolve('src/pages'))
            .set('_CSS_', resolve('src/assets/css'))
            .set('_IMG_', resolve('src/assets/image'))
            .set('_CFG_', resolve('src/config'))
            .set('_LIBS_', resolve('src/libs'))
        }
    }
    ```
    - 配置本地请求跨域代理
        旧项目中是在 `dev-server.js` 中设置了本地启动后地址是'https://zsk.dev.591.com.tw'，api.js中还需要判断当前环境去请求对应的接口地址,还得运维配合设置。属实繁琐，故此次直接在 `vue.config.js` 中设置代理
    ```javascript
    module.exports = {
        devServer: {
            proxy: {
                '/home': {
                    target: 'https://kfwiki.debug.591.com.tw',
                    changeOrigin: true
                },
                '/admin': {
                    target: 'https://kfwiki.debug.591.com.tw',
                    changeOrigin: true
                },
                '/api': {
                    target: 'https://zsk.debug.591.com.tw',
                    changeOrigin: true
                }
            }
        }
    } 
    ```
### 创建 eslintrc.js

旧项目中没有启用`eslint`，代码风格依人各异，新增`eslint`，形成统一规范的代码风格
1. 安装eslint后，发现启动项目时报错，`$ is not defined`，原来是在 `vue.config.js` 配置中没有预加载jQuery插件
```javascript
module.exports = {
    configureWebpack: {
        // 预加载插件
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ]
    }
}
```
2. 如此操作后发现eslint报错还是依然存在，应该是eslint设置的问题，于是查阅eslint配置文档，在 `.eslintrc.js` 中增加globals即可忽略此报错
```javascript
module.exports = {
    globals: {
        "jQuery": true,
        "$"     : true,
    },
}
```
3. 旧项目中使用了 “==” , 没有使用 “===”, 与默认eslint配置冲突。由于大量没有使用全等符合，一个个去排查比较麻烦。所以本项目不对全等做特殊要求，但后续的维护还是需要使用全等符号。
```javascript
module.exports = {
    'rules': {
        // 取消全等的限制
        'eqeqeq': 1,
    }
}
```
### 前后项目目录结构对比
1. vue-cli2项目结构
```
wiki-vue-cli2项目结构
├─.eslintrc.js
├─.gitignore
├─.babellrc
├─bulid
├─README.md
├─config
├─package-lock.json
├─package.json
├─src
|  ├─App.vue
|  ├─main.js
|  ├─pages
|  ├─components
|  └── ... 
├─static
├─index.html
├─node_modules
└── ...
```
2. vue-cli4项目结构
```
wiki-vue-cli4项目结构
├─.eslintrc.js
├─.gitignore
├─.postcssrc.js
├─.project
├─README.md
├─babel.config.js
├─package-lock.json
├─package.json
├─vue.config.js
├─src
|  ├─App.vue
|  ├─main.js
|  ├─pages
|  ├─components
|  └── ... 
├─public
|  ├─index.html
|  └── ... 
├─node_modules
└── ...
```
### 开发环境启动项目
1. 运行 `npm run dev` ，启动项目