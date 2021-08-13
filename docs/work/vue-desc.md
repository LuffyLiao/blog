#### 一、vue项目介绍
---
#### 1.1.1 文件目录
```
node_modules                      包文件
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
|-- lib                              外部引用的插件
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|   |-- modules                      按模块区分文件夹
|   |-- |-- tab
|   |-- index.js
|-- store                            vuex, 统一管理
|   |-- modules                      按模块区分文件夹
|   |-- |-- tab
|   |-- index.js
|-- views                            视图目录
|   |-- market                           market模块名
|   |-- |-- market-list.vue              market列表页面
|   |-- |-- market-detail.vue            market详情页面
|   |-- |-- components                   market模块通用组件文件夹
|   |-- employee                         employee模块
.env                                 环境文件
vueconfig.js                         vue配置文件:代理，别名...
bableconfig.js                       babel配置文件
```
#### 1.1.2 环境模式
Vue-cli有三个模式，当运行`vue-cli-serve`命令时，所有的环境变量会从对应的环境文件中载入
- `development`：执行`vue-cli-service serve`时
- `test`：执行`vue-cli-service test:unit`时
- `production`：执行`vue-cli-service build 和 vue-cli-service test:e2e`时

`.env`文件：在所有模式下都会加载此配置,相当于默认值
如在 development 或者 producttion 模式下, .env.development 或 .env.producttion 有优先 .env 加载

有且只有三个变量会被加载，使用：process.env.Xxxx
- `BASE_URL`：会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。
- `VUE_APP_*`： 变量以VUE_APP_开头
- `NODE_ENV`：模式，值为development，test，production

#### 1.1.3 入口文件 main.js
注册vue，以及挂载dom元素

#### 1.1.4 router-view
渲染路径匹配到的视图组件，通俗点理解就是url变化时，会去匹配对应的路由path

#### 1.1.5 ant的使用
ant就是一个ui组件库，[文档](https://antdv.com/docs/vue/introduce-cn/)
- 按需加载，需要什么组件，就在`@/plugins/antd`去注册和use
- 然后在main.js引入`@/plugins/antd`去

#### 1.1.6 package.json
定义了运行项目所需要的各种依赖和项目的配置信息（如名称、版本、许可证等元数据）
- `name`，`version`：必备属性，他们组成npm模块的唯一标识
- `dependencies` ：项目运行所依赖的模块（生产环境）
- `devDependencies` ：项目运行所依赖的模块（开发环境），代码打包上线时不需要这些工具
- `scripts`：对象的属性可以通过`npm run` 运行脚本
**注意：不要随意往项目中新增依赖，如果需要，可以先和组员们讨论增加的必要性**
#### 二、vuex的使用
--- 
#### 2.1.1 什么是vuex？
他的用途是不同组件之间的数据共享。通过vuex源码可以看出，其实vuex本质是vue的一个插件，在所有组件的 `beforeCreate`生命周期注入了设置 `this.$store`这样一个对象。然后在`this.$store`增加了一些方法。
```javascript
// src/store.js
export function install (_Vue) {
    // 单例模式，确保vuex只安装一次
  if (Vue && _Vue === Vue) {
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

// src/mixins.js
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```
#### 2.1.2 vuex生命周期图
![alt 属性文本](https://vuex.vuejs.org/vuex.png)

#### 2.1.3 简单vuex的使用
1. 在store js里面在仓库定义state,mutations等
```javascript
// vue2用法
export const store = new Vuex.Store({
    state: {},
    mutations:{},
    getters: {},
    actions: {}
}) 
// vue3用法
export default createStore({
    state: {
        name: '张三',
        sex: ''
    },
    mutations:{、
        // 接收的默认参数为state，第二个参数为载荷
        setSex(state, playload){
            const { sex } = playload
            state.sex = sex
        }
    },
    // 类似计算属性，有返回值
    getters: {
        // 接收的默认参数为state 第二个参数为getters
        setName(state, getters){
            return `我是${state.name}`
        }
    },
    actions: {
       
    }
})

```

2. 在组件中使用state,getters
```javascript
computed: {
    getName(){
        return this.$store.state.name
    },
    setName(){
        return this.$store.getters.setName
    }
}
```

3. 在组件中修改state: `mutations`
```javascript
this.$store.state.XXX = XXX
```
state可以随便拿，但是不能随便改，想要改，必须通过`mutations`去修改

```javascript
this.$store.commit('setSex', {sex:'boy'}) // 1个参数
this.$store.commit('setSex', {sex:'boy', age:18}) // 多个参数
```
4. 异步修改state: `actions`
因为当 mutation 触发的时候，回调函数还没有被调用，所以使用Action处理异步操作
```javascript
// 接收的默认参数为context执行上下文
actions:{
    resetName(context){
        // 我们模拟一个异步操作，3秒后修改name为luffy
        return new Promise(resolve => { 
            setTimeout(() => {
                context.commit('setName', luffy)
                resolve()
            }, 3000)
        })
    }
}

// 组件中调用
this.$store.dispatch('resetName')
```
#### 2.1.4 辅助函数mapState, mapGetters , mapMutations, mapActions
也可以使用辅助函数，减少大量的dispatch和commit
```javascript
...mapState({
    name: state => state.name,
    count: 'count', // 等同于count: state => state.count
})
...mapMutations(['setName'])
...mapMutations({alias: 'setName'}) // 也可以重置一个别名，映射到setName
```

#### 2.1.5  Modules模块
在实际生产中的项目中，会根据不同业务分成不同模块，便于维护
1. 在store/index.js
```javascript
import tab from './modules/tab'
export const store = new Vuex.Store({
  modules: {
    tab
  }
})
```
2. 在store/modules/tab/index.js
```javascript
export default {
    namespaced: true, // 避免模块冲突
    state: {},
    getters: {}
    ...
}
```

3. 组件中使用,需要带上命名空间的模块名
```javascript
    ...mapGetters('tab', ['getMoreContent'])
    ...mapActions('tab', ['resetContent'])
```
#### 2.1.6  vuex 小结
- Vuex全局维护一个对象，应用了单例模式
- 对象上所有属性都是响应式的，任意属性进行了改变，都会造成使用该属性的组件进行更新
- `state`的值只能通过`commit`去调用`mutations`的方法进行更改
- 异步的操作，通过`dispatch`派发`actions`，再通过`actions`执行`commit`，去调用`mutations`的方法进行更改
- 语法糖
#### 三、bus的使用
关于bus的文档介绍比较隐秘，藏在废弃的`$dispatch` 和`$broadcast `替代[文档](https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2)

```javascript
var bus = new Vue()

// 派发
bus.$emit('eventName')
// 监听
bus.$on('eventName')

// 移除
destroyed(){
    bus.$off('eventName')
}
```
注意：使用bus时，需要手动移除监听事件。因为页面跳转时，原来的vue组件被注销，但是原来vue组件向bus容器中添加的事件监控不会被移除