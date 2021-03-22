---
title: TypeScript - 联合类型
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 联合类型 (Union Types)

表示取值可以是多种类型中的一种

## 举个例子

```typescript
let myNumber: string | number
myNumber = 'one'
myNumber = 1
```

```typescript
let myNumber: string | number
myNumber = true 
// 報錯：error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

联合类型使用 `|` 分隔每个类型，允许 myNumber 的类型是 string 或者 number，但是不能是其他类型。

## 访问联合类型的属性和方法

当 `TypeScript` 不确定联合类型中的变量到底是哪个类型时，我们**只能访问联合类型中并集的属性和方法**。

```typescript
let myNumber: string | number
myNumber.toString() // toString属于string和number的共有属性，不会报错
myNumber.length // number没有length的方法，会报错 error TS2339: Property 'length' does not exist on type 'number'.
```

联合类型的变量在被赋值的时候，会根据类型推论的规则，推断出一个类型。

```typescript
let myNumber: string | number
myNumber = 'one'
myName.length // 推断是string，length为3

myNumber = 1
myNumber++
```

以上代码可正常执行，第一个 `myNumber` 被推断是 `string` 类型，第二个`myNumber` 被推断是 `number` 类型。

## 参考

-   [TypeScript 入门教程 - 联合类型](https://ts.xcatliu.com/basics/union-types)
