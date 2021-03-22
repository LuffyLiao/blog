---
title: TypeScript - 内置对象
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
 - 内置对象
---
## 内置对象 （Build In Objects）

内置对象是指，根据标准在全局作用域上的对象。这里的标准是指 `ECMAScript` 和其它环境的标准。

## ECMAScript 的内置对象

ECMAScript 标准提供的内置对象有：`Boolean`、`Error`、`Date`、`RegExp` 

我们可以在 `TypeScript` 中将变量定义为这些类型。

```typescript
let b: Boolean = new Boolean(1)
let e: Error = new Error('Error')
let d: Date = new Date()
let r: RegExp = /[a-zA-Z]/g
```
定义的内置文件在[TypeScript 核心库的定义文件](https://github.com/microsoft/TypeScript/tree/master/src/lib)

## DOM 和 BOM 的内置对象

DOM 和 BOM 提供的内置对象有：`Document`、`HTMLElement`、`Event`、`NodeList`

```typescript
let body: HTMLElement = document.body
let allDiv: NodeList = document.querySelectorAll('div')

document.addEventListener('click', function (e: MouseEvent) {
    console.log(1)
})
```

## TypeScript 核心库的定义文件

[TypeScript 核心库的定义文件](https://github.com/microsoft/TypeScript/tree/master/src/lib)中定义了所有浏览器环境需要用到的类型，并且是预置在 `TypeScript` 中的。

当我们使用一些常用方法时，`TypeScript` 实际已经帮我们做了很多的类型判断工作了，例如：

```typescript
let random = Math.min(2,3)
// error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
```

## 用 TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```shell
npm install @types/node --save-dev
```

## 参考

-   [TypeScript 入门教程 - 内置对象](https://ts.xcatliu.com/basics/built-in-objects)