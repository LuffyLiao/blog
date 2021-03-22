---
title: TypeScript - 数组类型
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 数组类型 (Type Of Array)

在 `TypeScript` 中，数组类型有多种定义方式，比较灵活。

## 「类型 + 方括号」 表示法

最简单的方法是使用「类型 + 方括号」来表示数组：

```typescript
let arr: number[] = [1, 1, 2, 3, 5, 8, 12]
```

数组的项中不允许出现其他的类型：

```typescript
let arr: number[] = [1, '1', 2, 3, 5]

// index.ts:1:31 - error TS2322: Type 'string' is not assignable to type 'number'.
```

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

```typescript
let arr: number[] = [1, 1, 2, 3, 5]
arr.push('20')

// index.ts:2:16 - error TS2345: Argument of type '"20"' is not assignable to parameter of type 'number'.
```
上例中，push 方法只允许传入 number 类型的参数，但是却传了一个 "20" 类型的参数，所以报错了。

## 数组泛型

我们也可以使用数组泛型（Array Generic）`Array<number>` 来表示数组：

```typescript
let arr: Array<number> = [1, 1, 2, 3, 5, 8, 12]
```

## 用接口表示数组

```typescript
interface NumberArray {
    [index: number]: number
}
let arr: NumberArray = [1, 1, 2, 3, 5]
```

`NumberArray` 表示：索引和值的类型都是数字

虽然接口也可以用来描述数组，但是我们一般不会这么做

## 类数组 (Array Like Object)

类数组不是数组类型，比如 `arguments`

```typescript
function sum() {
    let args: any[] = arguments
}
// index.ts:2:9 - error TS2740: Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

上面的例子中，`arguments` 是一个类数组对象，不能用普通的数组进行描述，而应该使用接口。

```typescript
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

在上面这个例子中，我们除了约束当索引的类型是数字外，也约束了它还有 `length` 和 `callee` 两个属性。

事实上，常用的类数组都有自己的接口定义，`TypeScript` 已经为我们提供了例如：`IArguments`、`NodeList`、`HTMLCollection` 等。

```typescript
function sum() {
    let args: IArguments = arguments;
}
```

其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：

```typescript
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```
## any 在数组中的应用
一个比较常见的做法是，用 `any` 表示数组中任意出现的类型

```typescript
let list: any[] = ['dataList', 25, { age: '18' }];
```

## 参考

-   [TypeScript 入门教程 - 数组的类型](https://ts.xcatliu.com/basics/type-of-array)
