# Vue3新特性

Vue3新特性很多，比如：Performance、Tree-shaking、Composition API、Custom Renderer API等等很多强大的新特性，只是抽了一小部分来简单讲解。

## [Fragment](https://v3.vuejs.org/guide/migration/fragments.html#overview)

在书写 `vue2` 时，由于组件必须只有一个根节点，很多时候会添加一些没有意义的节点用于包裹：

```javascript
<template>
    <!--多余的 div 标签-->
    <div>
        <div>111111111</div>
        <p>222222222</p>
        <span>333333333</span>
    </div>
</template>
```

跟 `React.Fragment` 一样，使用一个名为 `Fragment` 的虚拟元素（虚拟元素不会在DOM树中呈现），从而不需要创建多余的 `DOM` 节点：

```javascript
<template>
    <div>111111111</div>
    <p>222222222</p>
    <span>333333333</span>
</template>
```

或者也可以这么写：

```javascript
import { defineComponent, h, Fragment } from 'vue';
 
export default defineComponent({
    render() {
        return h(Fragment, {}, [
            h('div', { 'style': {'color': 'red'}}, ['111111111']),
            h('p', {}, ['222222222']),
            h('span', {}, ['333333333']),
        ])
    }
})
```

## [Teleport](https://v3.vuejs.org/guide/teleport.html#using-with-vue-components)

`Teleport` 其实就是 `React`中的 `Portal`。`Portal` 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

使用方法`<Teleport to="#id 或者 tag name">内容</Teleport>`

我们在组件 `Teleport` 中写：

```javascript
<template>
    <div id="Teleport">
        <Teleport to="#app">
            <p>我写在 #Teleport 里</p>
        </Teleport>
    </div>
</template>
```

渲染后，我们就会看到，`<p>我写在 #Teleport 里</p>` 到了 `<div id="app"></div>` 中。

> 注意：有多个 #id 时，会加载到最外层的 id 里面去，不一定会在该 id 元素下的第一个位置。


## [Suspense](https://v3.vuejs.org/guide/migration/suspense.html#introduction) (实验性)

Suspense 让你的组件在渲染之前进行“等待”，并在等待时显示 fallback 的内容。

```javascript
<template>
    <Suspense>
        <template #default>
            <!--等待的组件-->
            <AsyncComponent />
        </template>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>
```

AsyncComponent.vue

```javascript
<template>
    我显示了
</template>

<script lang="ts">
import { defineComponent } from "vue";
 
const sleep = () => {
    // 三秒后才此组件显示
    return new Promise(resolve => setTimeout(resolve, 3000))
}
 
export default defineComponent({
    async setup() {
        await sleep()
    }
})
</script>
```

## [CSS Variables](https://github.com/vuejs/rfcs/blob/style-vars-2/active-rfcs/0000-sfc-style-variables.md) (实验性)

顾名思义，也就是 CSS 变量

为什么还要使用 CSS 变量，不是继续采用 `:style`？

- 同一个状态，多个组件中使用，`:style` 无法复用，不易于维护
- `:style` 我们无法设置伪元素的样式
- 编译后对变量名称进行哈希处理以减少CSS占用空间

直接上例子：

```javascript
<template>
   <p>测试CSS变量</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
   data () {
       return {
           color: 'red',
           font: {
               weight: 700,
               size: '60px'
           }
       }
   },
})
</script>

<style scoped lang="stylus">
   p
       // 使用变量color
       color v-bind(color)
       // 使用变量font.weight
       font-weight v-bind('font.weight')
       // 使用变量font.size
       font-size v-bind('font.size')
</style>
```

或者也可以在 setup 中这么写：

```javascript
setup() {
    const color = ref<string>('red')
    const font = reactive({ weight: 700, size: '60px' })

    return {
        color,
        font
    }
},
```

## Composition API（组合API）

也称为组合式 API：通过创建 Vue 组件，我们可以将界面中可重复的部分连同其功能一起提取为可重用的代码段。

`Composition API` 的主要思想是，我们将它们定义为从新的 `setup` 函数返回的 `JavaScript` 变量，而不是将组件的功能（例如`state`、`method`、`computed`等）定义为对象属性。

### 响应式 API：

#### setup 组件选项

它在 `create` 之前执行，`setup` 作为组合式 API 的入口点。

它接受 2 个参数：

- `props`：接收 `props` 数据
- `context`：JavaScript 对象，它暴露三个组件的 property：context.attrs、context.slots、context.emit

#### ref

`ref()` 函数用来给定的值创建一个响应式的数据对象，`ref()`的返回值是一个对象,这个对象上只包含一个.value属性。

> 将值封装在一个对象中，因为在 JavaScript 中，Number 或 String 等基本类型是通过值传递的，而不是通过引用传递的


还有 unref（ref则返回原始代理值）、isRef、toRef、toRefs等，有兴趣的自己去学习下。

#### reactive

接收一个普通对象然后返回该普通对象的响应式代理。

#### computed

`computed()` 用来创建计算属性，返回值是一个 ref 的实例。为了访问新创建的计算变量的 value，我们需要像使用 ref 一样使用 .value 来访问其值。

#### watch

watch 函数用来侦听特定的数据源，并在回调函数中执行副作用。

它接受 3 个参数：

- 一个我们想要侦听的响应式引用或 getter 函数
- 一个回调
- 可选的配置选项

与原来在 Vue2不同：

- 每次使用都得写 watch 函数
- 可以同时监听多个数据
- 可以停止监听

#### watchEffect

使用方式：

```javascript
const stopWatchEffect = watchEffect(() => {
    console.log('watchEffect-count', count.value)
    console.log('watchEffect-double', double.value)
})
```

与 `watch` 的差别:

- 不需要指定监听的属性
- 获取不到更新前的值 oldValue
- 组件初始化的时候执行一次

#### Provide / Inject

一般父子组件传值，我们使用 props，但是当深层次的组件，需要自己父-父-父..组件的时候，使用 props，无非得层层 “手递手” 传递。

Provide / Inject 就是解决这个问题的，它无视组件层次结构，可以直接 “穿越” 传值。我们直接看例子：

父组件：

```javascript
export default defineComponent({
    components: {
        provideInjectChild
    },
    
    setup() {
        const myName = ref('Jilin')
        const myInfo = reactive({
            age: 18,
            height: 180
        })

        const changName = () => {
            myName.value += '6'
        }

        const changAge = () => {
            myInfo.age += 1
        }

        // watch ref 和 reactive
        watch([myName, () => myInfo.age], ([myName1, age1], [myName2, age2])  => { 
            console.log([myName1, age1], [myName2, age2])
        })
        
        provide('myName', readonly(myName))
        provide('myInfo', readonly(myInfo))
        provide('changName', changName)
        provide('changAge', changAge)

        return {
            myName,
            myInfo,
            changName,
            changAge
        }
    }
})
```

子组件：

```javascript
import { defineComponent, inject, Ref} from 'vue';


export default defineComponent({
    setup() {
        // let myName = inject('myName', 'default name')
        let myName = inject('myName') as Ref<string>
        let myInfo = inject<any>('myInfo')
        const changName = inject('changName')
        const changAge = inject('changAge')

        myName.value = 'test name'
        myInfo.age = 19

        return {
            myName,
            myInfo,
            changName,
            changAge
        }
    }
})
```

### 例子：Vue2的计数器

- 双向绑定变量 count，默认 0
- 计算属性 double ，为 count 两倍
- Add one 按钮，点击后，count + 1
- count 加到 5 时，打印 “加到5了”

#### 实现方式

##### Vue 2.x

```javascript
<template>
    <div class="box">
        <h3>Vue 2.x</h3>
        <p>Count is: {{ count }}</p>
        <p>double is: {{ double }}</p>
        <button @click="increment">Add one</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        count: 0
    }),
    
    methods: {
        increment() {
            this.count++;
        }
    },

    watch: {
        count (val) {
            if (val === 5) {
                console.log('加到5了！')
            }
        }
    },

    computed: {
        double(): number {
            return this.count * 2;
        }
    },

    mounted () {
        console.log('vue2 component mounted!')
    }
})
</script>
```

##### Vue 3

```javascript
import { defineComponent, ref, computed, watch, onMounted, watchEffect } from 'vue';

export default defineComponent({
    setup() {
        const count = ref(0)
        const double = computed(() => count.value * 2)

        function increment() {
            count.value++
        }

        const stopWatchEffect = watchEffect(() => {
            console.log('watchEffect', count.value)
        })

        //监听 count
        const stopWatch = watch (count, (newValue, oldValue) => {
            if (newValue === 5) {
                console.log('加到5了！')
                stopWatch()
                // 在组件卸载时也自动停止。
                stopWatchEffect()
            }
            // count 为 5 时已经停止监听，以下代码永远不会执行
            if (newValue === 10) {
                console.log('加到10了！')
            }
        })    

        onMounted(() => {
            console.log('vue3 component mounted!')
        })

        return {
            count,
            double,
            increment
        }
    }
})
```

##### Vue 3 mixin 方式

```javascript
import { defineComponent } from 'vue';
import useCounter from "./useCounter";

export default defineComponent({
  setup() {
    const { count, double, increment } = useCounter();

    return {
        count,
        double,
        increment
    }
  }
})
```

代码提取到 useCounter.ts：

```javascript
import { ref, computed, watch } from "vue";

export default function () {
    const count = ref(0);
    const double = computed(() => count.value * 2)
    
    //监听 count
    const stop = watch (count, (oldValue, newValue) => {
        if (oldValue === 5) {
            console.log('加到5了！')
            stop()
        }
        // count 为 5 时已经停止监听，以下代码永远不会执行
        if (oldValue === 10) {
            console.log('加到10了！')
        }
    })

    function increment() {
        count.value++;
    }

    return {
        count,
        double,
        increment
    }
}
```
## Vue Router 4.0 特性介绍


### 项目结构优化
Vue Router 被分为三部分([项目地址](https://github.com/vuejs/vue-router-next/tree/master/src))：

- **History 实现：**根据 Vue Router 运行的环境来处理 URL 地址栏（例如，Node，Browser，Mobile等）。
- **Router 匹配器：**处理类似 `/users/:id` 的路由解析和优先级处理**。**
- **Router：**将一切连接在一起，并处理路由特定功能，例如导航守卫。



### 动态路由
[动态路由](https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html)是 Vue Router 最受欢迎的功能之一。4.0版本的 Router 对动态路由的使用有了更详细的介绍，配合上自动优先级排名的高级路径解析功能，我们现在可以更加随意的顺序来定义路由。Router 会根据 URL 字符串的表示来猜测应该匹配的路由。


这里我们需要注意的是，路由匹配方式的变更。


**Vue Router 3 版本中介绍章节:**


> **高级匹配模式**
> `vue-router` 使用 [path-to-regexp](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0) 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。
> 

> **匹配优先级**
> 有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。



**Vue Router4中:**


使用 **优先级排名**，相当于根据你路径书写的规则计算出一个得分，根据得分来优先选取最有可能的那一项。


举个例子来说，你同时写了 `/users` 和 `/:w+` 这两个路由：

```javascript
const routes = [
  {
    path: '/users',
    Component: Users
  },
  {
    path: '/:w+',
    Component: NotFound
  }
]
```


在这里，当你输入 `/users` 这个更精确的路径的时候，走上面的规则，而下面的规则作为兜底规则。避免了旧版 Vue Router 需要通过路由声明的顺序来保证这个行为。


也诞生了 [Path Ranker](https://paths.esm.dev/?p=AAMeJVyBwRkJTALagIAOuGrgACU.)，来计较路由的得分。


![image.png](https://cdn.nlark.com/yuque/0/2021/png/603094/1617205550844-0d42d2e8-760a-4322-bc8b-a77250ea7224.png#align=left&display=inline&height=469&margin=%5Bobject%20Object%5D&name=image.png&originHeight=469&originWidth=1057&size=55530&status=done&style=none&width=1057)


### 改进的导航系统


新的导航系统更加具有一致性，它改善了滚动行为的体验，使其更加接近原生浏览器的行为。 它还为用户提供了有关导航状态的几乎更多信息，用户可以用这些信息，通过 `ProgressBar` 和 `Modal` 之类的全局 UI 元素让用户的体验变得更好。


#### [scrollBehavior 的变化](https://next.router.vuejs.org/zh/guide/migration/index.html#scrollbehavior-%E7%9A%84%E5%8F%98%E5%8C%96)
> `scrollBehavior` 中返回的对象与 [`ScrollToOptions`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions) 类似：`x` 改名为 `left`，`y` 改名为 `top`。详见 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0035-router-scroll-position.md)。
> **原因**：使该对象类似于 `ScrollToOptions`，以使其感觉更像原生 JS API，并有可能启用将来的新配置。



#### [所有的导航现在都是异步的](https://next.router.vuejs.org/zh/guide/migration/index.html#%E6%89%80%E6%9C%89%E7%9A%84%E5%AF%BC%E8%88%AA%E7%8E%B0%E5%9C%A8%E9%83%BD%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84)
> 所有的导航，包括第一个导航，现在都是异步的，这意味着，如果你使用一个 `transition`，你可能需要等待路由 _ready_ 好后再挂载程序：

```javascript
app.use(router)
// 注意：在服务器端，你需要手动跳转到初始地址。
router.isReady().then(() => app.mount('#app'))
```
> 否则会有一个初始过渡，就像你提供了 `appear` 属性到 `transition` 一样，因为路由会显示它的初始地址（什么都没有），然后显示第一个地址。
> 请注意，**如果在初始导航时有导航守卫**，你可能不想阻止程序渲染，直到它们被解析，除非你正在进行服务器端渲染。否则，在这种情况下，不等待路由准备好挂载应用会产生与Vue2 中相同的结果。



#### [history.state 的用法](https://next.router.vuejs.org/zh/guide/migration/index.html#history-state-%E7%9A%84%E7%94%A8%E6%B3%95)
> Vue Router 将信息保存在 `history.state` 上。如果你有任何手动调用 `history.pushState()` 的代码，你应该避免它，或者用的 `router.push()` 和 `history.replaceState()` 进行重构：

```javascript
// 将
history.pushState(myState, '', url)
// 替换成
await router.push(url)
history.replaceState({ ...history.state, ...myState }, '')
```
> 同样，如果你在调用 `history.replaceState()` 时没有保留当前状态，你需要传递当前 `history.state`：

```javascript
// 将
history.replaceState({}, '', url)
// 替换成
history.replaceState(history.state, '', url)
```
> **原因**：我们使用历史状态来保存导航信息，如滚动位置，以前的地址等。



### 更强大的Devtools


多亏了新的[Vue Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)，Vue Router 能够和浏览器进行以下更高级的整合。


1. **时间轴**记录路由变化：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/603094/1617629708173-1e8c3faf-b3c5-4777-942e-67d5994c1bac.png#align=left&display=inline&height=412&margin=%5Bobject%20Object%5D&name=image.png&originHeight=412&originWidth=1569&size=56674&status=done&style=none&width=1569)


2. **完整 route 目录**，能够帮助你轻松进行调试：



![image.png](https://cdn.nlark.com/yuque/0/2021/png/603094/1617629774954-23748829-72e0-4b19-86bb-c90fac343d0f.png#align=left&display=inline&height=531&margin=%5Bobject%20Object%5D&name=image.png&originHeight=531&originWidth=1232&size=42974&status=done&style=none&width=1232)


### 更好的路由守卫


和 `next` 说拜拜，远离一些原本在 [路由守卫](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html) 内部比较容易犯的错误：返回您传递给 next 的任何值。 仍支持先前版本以简化迁移！


现在的路由守卫 API 更加友好且合理了，可以完美利用 `async await` 做异步处理，比如这样：

```javascript
router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
  return await canUserAccess(to)
})
```


### 一致的编码


编码方式（Encoding）做了统一的适配，现在将在不同的浏览器和路由位置属性（`params`, `query` 和 `hash`）中保持一致。 作为参数传递给 `router.push()` 时，不需要做任何编码，在你使用 `$route` 或 `useRoute()` 去拿到参数的时候永远是解码（Decoded）的状态。


### 迁移成本低


Vue Router 4 主要致力于于在改善现有 Router 的同时保持非常相似的 API，如果你已经很上手旧版的 Vue Router 了，那你的迁移会做的很顺利，可以查看文档中的[完整迁移指南](https://next.router.vuejs.org/guide/migration/index.html)。


### Vue Router 小结


总的来说， vue-router 相对于 上一代升级的幅度还是比较大的。主要包括了 路由匹配的规则、导航系统的变更、路由守卫的async


## Vuex 4.0
相对于 Vue Router 的升级幅度巨大，带来很多变化性的新功能，Vuex 所强调的是**兼容性**。 Vuex 4 支持 Vue 3，并且提供与 Vuex 3 完全相同的 API，因此用户可以在 Vue 3 中重用其现有的 Vuex 代码。


相对的，Vuex 4.0 的一些重要变更，下面也会总结以下：


### 安装过程发生了改变


为了与新的 Vue3 保持一致，Vuex的安装过程发生了更改。现在鼓励引入了 `createStore` 来创建一个 store 实例。


```javascript
import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      count: 1
    }
  }
})

// main.js
import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'

const app = createApp(App)

app.use(store)

app.mount('#app')
```
> 注意：`new Store(...)` 语法依然可以使用，`createStore` 为推荐用法。



### Vuex 4.0 的包和 Vue 3 对齐


- `vuex.global(.prod).js`
   - 直接在浏览器中 `<script src="...">` 引用。全局公开 Vuex 。
- `vuex.esm-browser(.prod).js`
   - 适用于本机ES模块导入（包括通过支持浏览器的模块）`<script type="module">`。
- `vuex.esm-bundler.js`
   - 给打包工具使用的库，像 `webpack`，`rollup` 和 `parcel`。
- `vuex.cjs.js`
   - 用于在的 Node.js 服务器端呈现中 `require()`

issue
### 声明 `ComponentCustomProperties`
Vuex 4 移除了 this.$store 在 Vue Component 的全局类型解决了一个 [issue](https://github.com/vuejs/vuex/issues/994) 。当配合 TypeScript 的时候，你必须声明你自己的模块扩充。


需要将下列的代码放入项目中。


```javascript
// vuex-shim.d.ts

import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
```


### createLogger 从核心库中剥离出来


在 Vuex 3 中，`createLogger` 是从 `vuex/dist/logger` 导出的，现在它被包含到核心库了。


```javascript
// vuex 3
import createLogger from "vuex/dist/logger"

// vuex4
import { createLogger } from 'vuex'
```


### Vuex 小结


总的来说，Vuex 核心功能较稳定，只是一些使用 api 的变更。

## 參考文獻

- [Vue3官方文档](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)
