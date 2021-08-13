### 前端代码规范
Front Standard Guide

#### 目的
规范的目的是为了编写高质量的代码，让团队成员每天看代码的心情是愉悦的，大家在一起是快乐的。

#### 一、通用规范

#### （一）命名规范
---
 v#### 1.1.1 命名严谨性
尽量使用语义化的英文命名方式，严禁使用拼音与英文混合的方式，即使纯拼音命名方式也要避免采用。

#### 1.1.2 项目命名
全部采用小写方式，以中划线分割
- good：`transport-management-system`
- bad：`transport_management_system`和`transportManagementSystem`

#### 1.1.3 目录命名
全部采用小写方式，以中划线分隔，有复数结构时，要采用复数命名法，缩写不用复数
- good：`scripts / styles / components / images / utils / layouts / demo-styles / demo-scripts / img / doc`
- bad：`script / style / demo_scripts / demoStyles / imgs / docs`

#### 1.1.4 JS、CSS、SCSS、HTML、PNG 文件命名
- good：`render-dom.js / index.css / index.html / company-logo.png`
- bad：`renderDom.js / UserManagement.html`

#### CSS命名
- class使用小写字母，以中划线分隔
- id使用驼峰命名
- less中的变量、函数、混合使用驼峰命名

#### JavaScript命名
- 变量：使用驼峰命名，优先使用`let`、`const`、避免使用`var`
```javascript
let userName = 'luffy'
const userInfo = {
    name: 'luffy'
}
```
- 常量：字母全部大写，以下横线`_`划分
```javascript
const DEFAULT_CONFIG = {
    apiKey: 'AIzaSyAGaARUnw9JZdo7SogXdU-J_aIyNQ1BcHs',
    authDomain: 'push-9d0cc.firebaseapp.com'
}
```
- 函数：使用驼峰命名命名，并且是动词或者动词+名词形式，以阐明方法的用途

good：`getHouseListData / openCarInfoDialog`
bad：`get / open / go`

#### （二）HTML规范（Vue Template 同样适用）
---

#### 1.2.1 语义化标签
优先使用`header / footer / section / nav / main`等语义化标签，避免满屏div

#### 1.2.2 缩进
嵌套的节点应该缩进，使用4个缩进

#### 1.2.3 单双引号
html中使用双引号`""`
```html
<div class="wrap"></div>
```

JavaScript中使用单引号`''`
```javascript
let username = 'luffy'

import { minBy } from 'lodash'
```
#### 1.2.4 重复代码
避免过多重复代码，如果超过三行类似的代码，配置数据再循环遍历

#### （三）CSS规范
---

#### 1.3.1 选择器
- 避免使用标签选择器
- 避免使用important选择器
- 推荐使用直接子选择器 
```css
// good
.content > .title{
    color: red;
    font-size: 16px;
}

// bad
.content .title{
    color: red;
    font-size: 16px;
}
```
#### 1.3.2 less嵌套
避免大量的嵌套规则，`最好`在3级之内，对于超过4级的嵌套，给予重写评估


#### JavaScript规范

#### 1.4.1 代码格式
不同逻辑、不同语义、不同业务的代码直接插入一个空行隔开

#### 1.4.2 字符串
统一使用单引号，不使用双引号
```javascript
// good
let str = 'foo';
let testDiv = '<div id="test"></div>';

// bad
let str = 'foo';
let testDiv = "<div id='test'></div>";
```

#### 1.4.3 条件判断
优先考虑三目运算符，但谨记不要写超过3层的三目运算符

#### 1.4.4 this的转换命名
对上下文this的引用使用'self'来命名

#### 1.4.5 删除无用代码
对于无用代码必须及时删除，例如：一些调试的 console 语句、无用的弃用功能代码

#### 二、Vue项目规范

#### （一）项目目录规范
---

#### 2.1.1 目录结构
```
src                               源码目录
|-- api                              所有api接口
|   |-- index.ts                     入口
|   |-- market.ts                       market模块
|   |-- user.ts                         user模块
|-- assets                           静态资源，images, icons, styles等
|   |-- images                       全局公用图片
|   |-- svgs                         全局公用svg
|   |-- styles                       全局公用样式
|-- components                       公用组件
|-- config                           配置信息
|-- hooks                            公用方法封装
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- lib                              外部引用的插件存放及修改文件
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|-- store                            vuex, 统一管理
|-- views                            视图目录
|   |-- market                           market模块名
|   |-- |-- market-list.vue              market列表页面
|   |-- |-- market-detail.vue            market详情页面
|   |-- |-- components                   market模块通用组件文件夹
|   |-- employee                         employee模块
```
#### 2.1.2 api目录规范
- 文件、变量命名要尽量与后端保持一致
- 此目录对应后端api接口，按照后端一个controller一个api.js文件
- api中的方法名字要与后端api url尽量保持语义高度一致
- 每个api添加注释，阐明接口用途

举个栗子：
```javascript
// 后端url：MarketController.java

`/market/index`
`/market/detail/{id}`
// 前端 market.ts
export const market: ApiList = {
    index: '/market/index'
    detail: '/market/detail'
}
```
#### 2.1.2 assets目录规范
里面存放 images, styles, icons 等静态资源，静态资源命名格式为小写+中划线

```
|assets
|-- icons
|-- images
|   |-- background-color.png
|   |-- company-logo.png
|-- styles
```

#### 2.1.3 components 目录规范
按照业务组件进行目录划分，目录命名为小写+中划线，组件命名规则也为小写+中划线
```
user-info
layout-header
```

#### 2.1.4 router、store 目录规范
- 按业务进行拆分成不同的ts文件
- router尽量按照 `views` 中的结构保持一致

#### （二）组件规范
--- 

#### 2.2.1 组件引入
引入的组件注册名使用驼峰命名，template模板中使用小写+中划线。
原因：在js中更自然的是驼峰命名，而html中对大小写是不敏感。
```javascript
<template>
    <user-info-panel></user-info-panel>
</template>

import UserInfoPanel from "./components/user-info-panel";

export default {
    components: {
        UserInfoPanel
    }
}
```
#### 2.2.2 组件传值
定义Prop的时候以驼峰命名，在父组件传值的时候使用小写+中划线，原因同上
```javascript
// 子组件 js
props: {
    activeIndex: { 
        type: Number,
        required: true, 
        default: -1 
    }
}
// 父组件 template
<market-item :active-index="1"></market-item>
```

#### （三）其他规范

#### 2.3.1 v-for
使用v-for时，必须写key

#### 2.3.2 style
为组件样式设置作用域，每个组件style都需要加上scoped

#### 2.3.3 适当换行和空行
- 如果组件上元素较多，需要换行 
- 每个逻辑结束需要空一行
```javascript
// good
li(
    :item='item',
    :index='index',
    :key='item.id',
    :active-index='activeIndex',
    @mouseover='setActiveIndex(index)',
    @mouseout='setActiveIndex(-1)',
    @click='$emit("itemClick", item, "historyList")'
)
// bad
li(:item='item', :index='index', :key='item.id', :active-index='activeIndex',  @mouseover='setActiveIndex(index)', @mouseout='setActiveIndex(-1)', @click='$emit("itemClick", item, "historyList")'
)
```

