---
title: TypeScript - 原始数据类型
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 原始数据类型
JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）
原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol
* * *
## 布尔值

使用 boolean 定义布尔值类型。
```typescript
    let isBool: boolean = false 
    // 编译后生成 var bool = false;
```

注意，使用构造函数 Boolean 实例化的对象不是布尔值：
```typescript
    let bool: boolean = new Boolean(true)
    // test.ts:3:5 - error TS2322: Type 'Boolean' is not assignable to type 'boolean'. （'Boolean' 类型与 'boolean' 不匹配）
    // 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.（boolean是原始数据类型，而new构造的是一个实例化对象，所以尽量使用boolean）
```
## 数值：
使用number定义数值类型，支持十进制，十六进制，二进制和八进制
```typescript
let num1:number = 10
let num2:number = Infinity
let num3:number = NaN
let num4:number = 0xf00d
```
编译后
```typescript
var num1 = 10
var num2 = Infinity;
var num3 = NaN;
var num4 = 10
```
## 字符串：
使用 string 定义字符串类型。
    
```typescript
let myName: string = 'liaowq' 
let myage: number = 28
// 模板字符串
let introduce: string = `hello, my name is ${myName}
I am ${myage} now`
```
编译后
```typescript
var myName = 'liaowq';
var myage = 28;
// 模板字符串
var introduce = "hello, my name is " + myName + "\nI am " + myage + " now";
```

## 空值
    
JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
    
```typescript
function test(): void {
    console.log('test');
}
```
编译后：

```typescript
function test() {
    console.log('test');
}
```
    
声明一个 void 类型的变量只能将它赋值为 undefined 和 null：

```typescript
let unusable: void = undefined

```
## Null 和 Undefined：

使用 null 和 undefined 定义这两个原始数据类型

```typescript
let n: null = nulll
let u: undefined = undefined
```

null 和 undefined 是所有类型的子类型。可以把 null 和 undefined 赋值给 number 或者 string 类型的变量。
```typescript
    let n: number = null
    let u: string = undefined
    
```
//不会报错，编译后

```typescript
var n = null;
var u = undefined;

```
但是viod不行， void 类型的变量不能赋值给 number 类型的变量：
```typescript
let v: void;
let num: number = v;
// 报错 test.ts:31:5 - error TS2322: Type 'void' is not assignable to type 'number'.

```


