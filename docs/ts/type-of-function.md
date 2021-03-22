---
title: TypeScript - 函数的类型
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 函数的类型 (type-of-function)

## 函数声明

在 `JavaScript` 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）：

```typescript
// 函数声明
function getSum (x,y){ 
    return x + y
}

// 函数表达式
let getSum = function (x ,y){
    return x + y
}
```
而在`TypeScript`中，一个函数需要把输入和输出都考虑到

```typescript
function getSum(x:number, y:number): number {
    return x + y
}
getSum(3,4) // 7
```
注意，**参数不能多，也不能少，否则会报错**

```typescript
function getSum(x:number, y:number): number {
    return x + y
}

getSum(3,4,5) //  An argument for 'y' was not provided.

getSum(3) // error TS2554: Expected 2 arguments, but got 1.
```
## 可选参数
那么如何定义可选的参数呢？与接口中的可选属性类似，使用`?`表示可选参数

```typescript
function myGirlFriend(name: string, age?: number){
    return age ? name + age : name
}
myGirlFriend('wangOu', 18) // wangOu18
myGirlFriend('wangOu') // wangOu
```
## 函数表达式

那么`typescript`中的函数表达式又是怎样写的呢?

```typescript
let getSum = function(x:number, y:number): number {
    return x + y
}
```
上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的`getSum`,是通过赋值操作进行类型推论而推断出来的。
实际上上面代码等同于

```typescript
let getSum:(x:number, y:number) => number = function(x:number, y:number): number {
    return x + y
}

// 编译后：
var getSum = function (x, y) {
    return x + y
}
```
注意不要混淆了`TypeScript`中的`=>`和ES6中的`=>`
在`TypeScript`的类型定义中，`=>`用来表示函数的定义，左边是输出类型，需要用括号括起来，右边是输出类型

## 用接口定义函数的形状

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```typescript
interface MyGirlFriend {
    (name:string, index: string): boolean
}

let wangOu: MyGirlFriend ;

wangOu = function(name: string, index:string){
    return name.indexOf(index) > -1
}

wangOu('wangOu','wang') // true
```

## 参数默认值

和ES6一样，我们允许给函数的参数添加默认值，但`TypeScript` 会将添加了默认值的参数识别为可选参数：

```typescript
function myGirlFriend(name:string, age:number = 18){
    return name + 'is' + age
}
let wangOu = myGirlFriend('wangOu',18) //"wangOu is 18"
let wangOu = myGirlFriend('wangOu') // "wangOu is 18"
```

但`TypeScript` 中不受 “可选参数必须在必须参数后面” 的限制

```typescript
function myGirlFriend(age:number = 18, name:string){
    return name + 'is' + age
}
let wangOu = myGirlFriend(18, 'wangOu') //"wangOu is 18"
let wangOu = myGirlFriend(undefined, 'wangOu') //"wangOu is 18"

```
## 剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```typescript
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let arr = [];
push(arr, 1, 2, 3); // arr = [1, 2, 3]
```
事实上，items 如果是一个数组。所以我们可以用数组的类型来定义它：

```typescript
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let arr = [];
push(arr, 1, 2, 3);  // arr = [1, 2, 3]
```
注意，**rest 参数只能是最后一个参数**

## 参考

-   [TypeScript 入门教程 - 函数的类型](https://ts.xcatliu.com/basics/type-of-function)
