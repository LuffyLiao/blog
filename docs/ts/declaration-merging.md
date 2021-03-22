---
title: TypeScript - 声明合并
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

* * *
### 函数的合并

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
### 接口的合并

接口中的属性在合并时会简单的合并到一个接口中：

```typescript
interface Alarm {
    price: number;
}
interface Alarm {
    weight: number;
}

// 相当于

interface Alarm {
    price: number;
    weight: number;
}

```
注意，合并的属性的类型必须是唯一的：

```typescript
interface Alarm {
    price: number;
}
interface Alarm {
    price: string;  // 类型不一致，会报错
    weight: number;
}
```
接口中方法的合并，与函数的合并一样：

```typescript
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}
// 相当于：
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```
## 参考
-   [TypeScript 入门教程 - 泛型](https://ts.xcatliu.com/advanced/declaration-merging.html)
