---
title: TypeScript - 类型推论
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 类型推论

    如果没有明确的指定类型，那么 TypeScript 就会依据类型推论规则推断出一个类型。

* * *
## 什么是类型推论？
以下代码虽然没有指定类型，但在编译的时候会报错

```typescript
let something = 'one'
something = 1
// 报错 test.ts:37:1 - error TS2322: Type '1' is not assignable to type 'string'.

```
事实上，它等价于以下代码：
    
```typescript 
let something: string = 'one'
something = 1
// 报错 test.ts:37:1 - error TS2322: Type '1' is not assignable to type 'string'.

```
typeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
##  如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

```typescript
let something
something = 'one'
something = 1
// 不会报错，编译通过
```