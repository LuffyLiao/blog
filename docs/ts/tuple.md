---
title: TypeScript - 元祖
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 元祖
数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

元组起源于函数编程语言（如 F#），这些语言中会频繁使用元组。
* * *
## 举个例子
定义一对值分别为`string`和`number`的元祖：

```typescript

    let tom:[string, number] = ['luffy', 18]
```
这时候，赋值或者访问已知索引的元素时，会得到正确的类型：
```typescript
    let luffy: [string, number]
    luffy[0] = 'Luffy'
    luffy[1] = 25

    luffy[0].slice(1)
    luffy[1].toFixed(2)

    console.log(luffy)
```
编译后
```typescript
    var luffy;
    luffy[0] = 'Luffy'; // 会报错 Cannot set property '0' of undefined
    luffy[1] = 25;

    luffy[0].slice(1);
    luffy[1].toFixed(2);

    console.log(luffy);

```
解决上面报错，声明的时候就赋值

```typescript
    let luffy: [string, number] = ['' ,0]
    luffy[0] = 'Luffy'
    luffy[1] = 25

    luffy[0].slice(1)
    luffy[1].toFixed(2)

    console.log(luffy)

```
编译后
```typescript
    var luffy = ['', 0];
    luffy[0] = 'Luffy';
    luffy[1] = 25;

    luffy[0].slice(1);
    luffy[1].toFixed(2);

    console.log(luffy); // [ 'Luffy', 25 ]
```

## 举个例子

## 参考

-   [TypeScript 入门教程 - 字符串字面量类型](https://ts.xcatliu.com/advanced/tuple.html)
