---
title: TypeScript - 声明文件
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 声明文件 (declaration-files)
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
* * *
## 什么是声明语句
假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 `<script>` 标签引入 `jQuery`，然后就可以使用全局变量 `$`或 `jQuery` 了。

```typescript
   $('#foo')
   // 或者
   jQuery('#foo')
```
但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么

```typescript
    $('#foo')
    // 或者
    jQuery('#foo')

    // Cannot find name '$'. 'jQuery' `.
```
这时，我们需要使用 declare var 来定义它的类型：

```typescript
    declare var jQuery: (selector: string) => any

    jQuery('#foo') // 编译后： jQuery('#foo')
```
上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。

## 什么是声明文件

通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件

```typescript
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any;
}
```

```typescript
// src/index.ts

jQuery('#foo');

```

声明文件必需以 `.d.ts` 为后缀。
一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts `结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts`文件就都可以获得 `jQuery` 的类型定义了。

假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

## 第三方声明文件

当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：jQuery in DefinitelyTyped。
我们可以直接下载下来使用，但是更推荐的是使用 @types 统一管理第三方库的声明文件。

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

```shell
npm install @types/jquery --save-dev
```

## 书写声明文件

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。

库的使用场景主要有以下几种：

在不同的场景下，声明文件的内容和使用方式会有所区别。
-   全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
-   npm 包：通过 `import foo from 'foo'` 导入，符合 `ES6` 模块规范
-   UMD 库：既可以通过 `<script>`标签引入，有可以通过 `import` 引入
-   直接扩展全局变量：既可以通过 `<script>` 标签引入，改变全局变量的结构
-   模块插件，通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

### 全局变量

全局变量的声明文件主要有以下几种语法：

-   `declare var` 声明全局变量
-   `declare function` 声明全局方法
-   `declare class` 声明全局类
-   `declare enum` 声明全局枚举类型
-   `declare namespace` 声明全局对象
-   `interface` 和 `type` 声明全局类型

**`declare var`**

定义一个全局变量的类型，与其类似的，还有 `declare let` 和 `declare const`，使用 `let` 和使用 `var` 没有什么区别

```typescript
// src/jquery.d.ts

declare let jQuery: (selector: string) => any
```

```typescript
// src/index.ts
jQuery('#foo')
// 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
jQuery = function(selector) {
    return document.querySelector(selector)
}
```
而当我们使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了
```typescript
// src/jQuery.d.ts

declare const jQuery: (selector: string) => any;

jQuery('#foo');
// 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
jQuery = function(selector) {
    return document.querySelector(selector);
};
// ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.
```
需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现

```typescript
declare const jQuery = function(selector) {
    return document.querySelector(selector);
};
// - error TS1183: An implementation cannot be declared in ambient contexts.
```
**`declare function`**

`declare function` 用来定义全局函数的类型。`jQuery` 其实就是一个函数，所以也可以用 `function`来定义：

```typescript
declare function jQuery(selector: string): any;
```

**`declare class`**
当全局变量是一个类的时候，我们用 `declare class` 来定义它的类型：

```typescript
// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
```
**`declare enum`**
使用 `declare enum` 定义的枚举类型也称作外部枚举（Ambient Enums)
举个例子
```typescript
// src/Directions.d.ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```
```typescript
// src/index.ts

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
与其他全局变量的类型声明一致，`declare enum`仅用来定义类型，而不是具体的值。

**`interface 和 type`** 接口 和 类型
```typescript
// src/jQuery.d.ts
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any
}
declare namespace jQuery {
    function ajax(url: string, settings?: AjaxSettings): void
}

// 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下
declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any
    }
    function ajax(url: string, settings?: AjaxSettings): void
}

// src/index.ts
let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
}
```
## 参考

-   [TypeScript 入门教程 - 声明文件](https://ts.xcatliu.com/basics/declaration-files)
