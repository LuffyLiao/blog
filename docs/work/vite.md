---
title: vite
date: 2021-03-25 13:56:11
sidebar: 'auto'
categories: 
 - vue
tags: 
 - vite
---
## vite
### [vite是什么](https://cn.vitejs.dev/)

vite 法语(发音 `/vit/`) ，轻量，轻快的意思

---
- 是一个全新的**开发构建工具**，能够显著提升前端开发体验
- 对 TypeScript、JSX、CSS 等支持开箱即用
- 在开发环境中，相当于一个静态的服务器
- 基于原生ES模块，按需编译，快！

### 为什么会出现 `Vite`？

在过去的 `Webpack`、`Rollup` 等构建工具的时代，在本地开发调试的时候，会提前把你的模块先打包成浏览器可读取的 `js bundle`，所以当项目越来越大时，启动越来越慢，热更新也越来越慢

随着现代浏览器厂商的不断升级，现在[大部分浏览器](https://caniuse.com/es6-module-dynamic-import)开始原生支持ES模块，尤大正是利用了这点，巧妙的解决了慢速启动这个问题

### ES 模块

现代浏览器原生支持的[模块功能](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
```html
<script type="modules">
    import { a } from './a.js'
</script>
```
当声明一个 `script` 标签类型为 `modules` 时，浏览器将对其内部的 `import` 引用发起 HTTP 请求获取模块内容

ESM 标准中 import的 必须是一个路径，相对/绝对路径，否则就会报错

### 基础体验 vs `vue-cli`
按照官网手册，先跑起来看看
```javascript
// node.js版本 > 12.0.0
npm init @vitejs/app
```
```javascript
// package.json
{
"devDependencies": {
    "@vitejs/plugin-vue": "^1.1.5",
    "@vue/compiler-sfc": "^3.0.5",
    "vite": "^2.0.5"
 }
}
```
开发依赖非常简单，只有 vite 和 @vue/compiler-sfc。vite 就是我们今天要介绍的主角，而 @vue/compiler-sfc 就是用来编译我们项目中 .vue 结尾的单文件组件（SFC），它取代的就是 Vue.js 2.x 时使用的 vue-template-compiler。

### 速度的对比
当我们执行 vite serve 的时候，你会发现响应速度非常快，几乎就是秒开

对比使用 `vue-cli-service`（内部还是 Webpack）启动开发服务器，**快5倍以上**，随着项目越大，差距越大

因为`Webpack Dev Server` 在启动时，会将所有模块提前编译、打包进 bundle 里，随着项目越来越大打包后的 bundle 也越来越大，打包的速度自然也就越来越慢。
![alt 属性文本](https://cn.vitejs.dev/assets/bundler.37740380.png)
而 Vite 则完全不同，利用现代浏览器原生支持 ESM 特性，省略了对模块的打包。对于需要编译的文件，Vite 采用的是另外一种模式：即时编译。也就是说，只有具体去请求某个文件时才会编译这个文件。

![alt 属性文本](https://cn.vitejs.dev/assets/esm.3070012d.png)

所以，这种「即时编译」的好处主要体现在：按需编译。

热更新速度演示

### 页面的引入
首先，main.ts里的源码是这样的
```javascript
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```
但是我们在浏览器中看到的是这样的
```javascript
import {createApp} from "/node_modules/.vite/vue.js?v=7affef7d";
import App from "/src/App.vue";
createApp(App).mount("#app");
```
其次APP.vue中的源码也和浏览器中展示的大不相同

### 依赖预编译
Vite 2.0 在启动开发服务器之前，会先用 [`esbuild`]((https://github.com/evanw/esbuild))把检测到的依赖预先构建一遍
- 目的1：将作为CommonJS发布的依赖包转换成为ESM
- 目的2：将内部有很多依赖关系转换为单个模块，并强制缓存下来，提升性能
```tpyescript
const listen = httpServer.listen.bind(httpServer)
httpServer.listen = (async (port: number, ...args: any[]) => {
  try {
    await container.buildStart({})
    // 这里会进行依赖的预构建
    await runOptimize()
  } catch (e) {
    httpServer.emit('error', e)
    return
  }
  return listen(port, ...args)
}) as any
```
[Github optimizer](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/optimizer/index.ts)



### vite的实现原理
Vite 的基本实现原理，就是启动一个服务器拦截浏览器请求ES Module的请求。通过 path 找到目录下对应的文件做一定的处理最终以 ES Modules 格式返回给客户端

**1. 请求拦截**
![alt 属性文本](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3157aa930e1f44eaa501412b9f4ea576~tplv-k3u1fbpfcp-zoom-1.image)
**2. `node_modules` 模块的处理**
浏览器发送 path 为 /node_modules/:id 的对应请求后。会被 Vite 拦截，最终找到对应的模块代码进行返回。
```javascript
export const moduleRE = /^\/node_module\//
// plugin for resolving /@modules/:id requests.
app.use(async (ctx, next) => {
    if (!moduleRE.test(ctx.path)) {
      return next()
    }
    // path maybe contain encode chars
    const id = decodeURIComponent(ctx.path.replace(moduleRE, ''))
    ctx.type = 'js'
    const serve = async (id: string, file: string, type: string) => {
      moduleIdToFileMap.set(id, file)
      moduleFileToIdMap.set(file, ctx.path)
      debug(`(${type}) ${id} -> ${getDebugPath(root, file)}`)
      await ctx.read(file)
      return next()
    }   }
    // alias 
    const importerFilePath = importer ? resolver.requestToFile(importer) : root
    const nodeModulePath = resolveNodeModuleFile(importerFilePath, id)
    if (nodeModulePath) {
      return serve(id, nodeModulePath, 'node_modules')
    }
})
 
```
**3. `.vue`文件的处理**

把.vue文件在服务端解析成了一个对象，并把render函数挂载在这个对象上，(模板编译成了组件对象的render函数，render函数最终渲染结果其实就是VDom)
```javascript
  if (descriptor.template) {
    const templateRequest = publicPath + `?type=template`
    code += `\nimport { render as __render } from ${JSON.stringify(
      templateRequest
    )}`
    code += `\n__script.render = __render`
  }
  code += `\n__script.__hmrId = ${JSON.stringify(publicPath)}`
  code += `\n__script.__file = ${JSON.stringify(filePath)}`
  code += `\nexport default __script`
```

### HMR(Hot Module Reload)原理
在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块失效即可，从而使HMR更新始终快速，无论应用的大小。

### vite 的局限和扩展

1. vite默认只支持原生支持ESM的现代浏览器，不兼容IE浏览器，可以通过官方的[@vite/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)来支持旧浏览器。
2. vite默认不支持vue2.x，使用vite写的插件再去接入历史项目可能有比较多的坑
### 小结
1. 核心功能：ESM + Static Server + Compile + HMR

2. 核心思路：
 
    a. 将当前项目目录作为静态文件服务器的根目录
    b. 拦截部分文件请求
    c. 处理代码中 import node_modules 中的模块
    d. 处理 vue 单文件组件（SFC）的编译

### 参考连接：
- [vite官网](https://cn.vitejs.dev/guide/features.html#typescript)
- [vite github仓库](https://github.com/vitejs/vite)
- [vite 2原理](https://juejin.cn/post/6881078539756503047)