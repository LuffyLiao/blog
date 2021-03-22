---
title: TypeScript - 枚举
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 枚举 (enum)
枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等,值是固定且在一定范围。
* * *
## 举个栗子
枚举使用 `enum` 关键字来定义：

```typescript
    // 枚举首字母一般大写
    enum Status {
        OFFLINE,
        ONLINE,
        DELETEDA
    }
```
枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

 ```typescript
    enum Status {
        OFFLINE,
        ONLINE,
        DELETED
    }

    Status[0] = 'OFFLINE'   // true
    Status[1] = 'ONLINE'    // true
    Status[2] = 'DELETED'   // true
    Status['OFFLINE'] = 0   // true
    Status['ONLINE'] = 1    // true
    Status['DELETED'] = 2   // true
```
事实上，上面的例子会被编译为：

```typescript
    var Status
    (function (Status) {
        Status[Status["OFFLINE"] = 0] = "OFFLINE";
        Status[Status["ONLINE"] = 1] = "ONLINE";
        Status[Status["DELETED"] = 2] = "DELETED";
    })(Status || (Status = {}));
```
## 手动赋值
```typescript
    enum Status {
        OFFLINE = 1.5
        ONLINE,
        DELETED
    }
```
上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。
可以赋值小数，负数，下一个都是+1递增
```typescript
    Status.ONLINE = 2.5   // true
    Status.DELETED = 3.5  // true
```
## 举个例子
```typescript
    enum Status {
        OFFLINE
        ONLINE,
        DELETED
    }
    function getResult(status){
       if(status === Status.OFFLINE){
           return 'offline'
       }else if(status === Status.ONLINE){
           return 'online'
       }else if(status === Status.DELETED){
           return 'deleted'
       }
       return 'error'
   }
   getResult(0) // offline
   getResult(1) // online
   
```
## 常数项和计算所得项
枚举项有两种类型：常数项（constant member）和计算所得项（computed member）
前面我们所举的例子都是常数项，一个典型的计算所得项的例子：
```typescript
    enum Color {Red, Green, Blue = "blue".length}; // 0,1,4
```
上面的例子中，`"blue".length`就是一个计算所得项。
上面的例子不会报错，但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：
```typescript
    enum Color {Red = "red".length, Green, Blue};
```

## 常数枚举
常数枚举是使用 const enum 定义的枚举类型：

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
}
```
常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

上例的编译结果是：
```typescript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

```
假如包含了计算成员，则会在编译阶段报错：
```typescript
   const enum Color {Red, Green, Blue = "blue".length};
```

## 外部枚举

外部枚举（Ambient Enums）是使用 `declare enum`定义的枚举类型：

```typescript
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
之前提到过，declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

上例的编译结果是：
```typescript
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
外部枚举与声明语句一样，常出现在声明文件中。

同时使用 declare 和 const 也是可以的：

```typescript
eclare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
上例的编译结果是：
```typescript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## 参考

-   [TypeScript 入门教程 - 枚举](https://ts.xcatliu.com/advanced/enum.html)
