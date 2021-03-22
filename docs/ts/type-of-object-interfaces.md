---
title: TypeScript - 接口
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 接口 (Interfaces)

在 `TypeScript` 中，我们使用接口定义对象的类型。

## 什么是接口

在面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

`TypeScript` 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

## 举个例子

```typescript
interface MyGirlFriend { // 接口首字母一般大写
    name: string
    age: number
}

let wangOu: MyGirlFriend = {
    name: 'wangOu',
    age: 18
}
```

上面的例子中，我们定义了一个接口 `MyGirlFriend`，接着定义了一个变量 `wangOu`，它的类型是 `MyGirlFriend`，这样我们就约束了`wangOu` 的形状必须和接口 `MyGirlFriend` 一致。

定义的变量比接口少了某些属性或者多了某些属性都是不行的，例如少了 `age`，多了`gender`

```typescript
interface MyGirlFriend {
    name: string
    age: number
}

let wangOu: MyGirlFriend = {
    name: 'wangOu',
    // age: 18
    gender: 'female'
}

//error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'MyGirlFriend'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'MyGirlFriend'.
```
可见，**赋值的时候，变量的形状必须与接口的形状保持一致**。

## 可选属性

如果我就是想不完全匹配一个形状呢？那么可以用可选属性：

```typescript
interface MyGirlFriend {
    name: string
    age?: number
}

let wangOu: MyGirlFriend = {
    name: 'wang Ou'
}
```

在属性的后面添加 "?", 含义是该属性可以不存在。

这时，**还是不能添加的新的属性**

```typescript
interface MyGirlFriend {
    name: string
    age?: number
}

let wangOu: MyGirlFriend = {
    name: 'wang Ou',
    age: 18,
    gender: 'female'
}

// index.ts:9:5 - error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'MyGirlFriend'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'MyGirlFriend'.
```

## 任意属性

那么我想接口允许有任意属性呢？可以使用以下方式：

```typescript
interface MyGirlFriend {
    name: string
    age?: number
    [property: string]: string
}

let wangOu: MyGirlFriend = {
    name: 'wang Ou',
    age: 18,
    gender: 'female'
}

//  index.ts:7:5 - error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'MyGirlFriend'.
//  Property 'age' is incompatible with index signature.
//  Type 'number' is not assignable to type 'string'.
```

**一旦定义了任意属性，那么确定属性和可选属性的类型值，都必须是它的类型的子集** age虽然是可选属性，但也必须是任意属性string的子集，不能是number

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```typescript
interface MyGirlFriend {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let wangOu: MyGirlFriend = {
    name: 'wang Ou',
    age: 18,
    gender: 'female'
}
```

## 只读属性

如果我们希望在对象中的某些字段只能在创建的时候被赋值，那么我们可以在属性前面使用 `readonly` 定义只读属性

```typescript
interface MyGirlFriend {
    readonly id: number
    name: string
    age?: number
    [property: string]: any
}

let wangOu: MyGirlFriend = {
    name: 'wang Ou',
    age: 18,
    gender: 'female'
}
wangOu.age = 20
wangOu.id = 99
// index.ts:14:8 - error TS2540: Cannot assign to 'id' because it is a read-only property.
```

## 参考

-   [TypeScript 入门教程 - 对象的类型--接口](https://ts.xcatliu.com/basics/type-of-object-interfaces)
-   [TypeScript 中文网 - 接口](https://www.tslang.cn/docs/handbook/interfaces.html)
