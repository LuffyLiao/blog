---
title: TypeScript - 任意值
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
 - 
---
## 任意值

用来表示允许赋值为任意类型。

* * *

## 那么什么是任意类型呢？

普通类型定义后是不允许修改类型的
```typescript
let num: string = 'seven';
num= 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

```

如果我后面想修改类型呢？定义成any 类型
```typescript
let num: any = 'seven';
num = 7;
// 通过
```

## 任意值的属性和方法
    
在任意值上访问任何属性都是允许的，即使不存在

```typescript
    let anyThing: any = 'ok''
    console.log(anyThing.myName)
    console.log(anyThing.toFIxed())
    // 编译通过
```
    
声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

## 未声明类型的变量
    
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
    
```typescript
    let someone = 'liaowq'
    someone = 28
    someone.myName()
```