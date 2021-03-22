---
title: TypeScript - 泛型
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

其实，简单的讲，泛型就是泛指的类型。

* * *
### 举个例子

实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时每一项都填充一个默认值

```typescript
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

但上个例子中有个明显的缺陷，就是没有准确定义返回值的类型。`Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
这时候，泛型就派上用场了：

```typescript

function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x');

createArray<number>(3, 3); 

```
### 多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```typescript
    function createStr<T, P>(first: T , second: P){
        return `${first}${second}`
    }
    createStr(1,'1') 
```
### 泛型约束

```typescript
    function loggingIdentity<T>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```
上例中，泛型 T 不一定包含属性 length，所以编译的时候报错了。
这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束：

```typescript
    interface Lengthwise{
        length: number
    }
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

    loggingIdentity(1) // error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```

上例中，T继承于Lengthwise，拥有它的所有属性，也就是必须会有`length`属性.而报错是因为在调用`loggingIdentity`函数时，传入的参数不包含`length`属性
多个类型参数之间也可以互相约束：

```typescript
    function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

    let x = { a: 1, b: 2, c: 3, d: 4 };

    copyFields(x, { b: 10, d: 20 }); // {a:1, b:10, c:3 ,d:20  }
```
上例中，我们使用了两个类型参数，其中要求 T 继承 U，T也就拥有了U中所有的属性

### 泛型接口

使用含有泛型的接口来定义函数的形状：

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
### 泛型类

```typescript
class GenericNumber<T> {
    zero: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zero = 0;
myGenericNumber.add = function(x, y) { return x + y };
```
### 泛型参数的默认类型

```typescript

interface Person {
    name: string
}
  
interface Man {
    name: string
    sex: string
}
  
// 没有默认值
function identity01<T extends Person>(arg: T): T {
    return  arg
}

// output01 是 Person 
let output01 = identity01({
    name: 'sddd'
})

// output03 是 Man
let output03 = identity01<Man>({
    name: 'sddd',
    sex: 'man'
})
  
//  有默认值
function identity02<T extends Person = Man>(arg: T): T {
    return  arg
}

// 这里 output02 依然是 Person , 而不是 Man
let output02 = identity02({
    name: 'sdsd'
});  

// output04 是 Man
let output04 = identity02<Man>({
    name: 'sdsd',
    sex: 'man'
});  
```
没看出有默认值和没有默认值的区别 。不知道实用性在哪? 感觉好像没有什么作用???

### 练习

```typescript
// 1.
function createStr2<T>(first: T , second: T): T{
    return `${first}${second}`
}
createStr<string, number>('1',1)

// 2.
function map<T>(params: T[]){
    return params
}
map<string>('1')

// 3.
interface Item {
    name: string
}

class MyName <T extends Item> { 
    constructor(private data: T[]) {}

    getItem(index: number): T{
        return this.data[index]
    }
}

const data = new MyName<number>([1])

// 4.
const func: <T>(params: T) => number = hello

function hello<T>(params: T){
    return params
}
```

## 参考

-   [TypeScript 入门教程 - 泛型](https://ts.xcatliu.com/advanced/generics.html)
