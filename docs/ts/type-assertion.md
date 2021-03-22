---
title: TypeScript - 类型断言
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 类型断言 (type-assertion)
类型断言（Type Assertion）可以用来手动指定一个值的类型。
* * *
## 语法

```typescript
   // 值 as 类型
```
或
```typescript
  // <类型>值
```
在tsx语法(React 的 jsx 语法的 ts 版)中必须使用前者,即`值 as 类型`

* * *
## 类型断言的用途

### 1.将一个联合类型断言为其中一个类型
之前提到过,当`TypeScript`不确定一个联合类型的变量到底是哪个类型的时候,我们只能访问此联合类型的所有类型共有的属性或方法
```typescript
interface Cat {
    name:string;
    run():void;
}

interface Fish {
    name:string;
    swim():void;
}

function getName(animal: Cat | Fish) {
    return animal.name // 共有方法 可
//  return animal.run 非共有方法 报错
}
```
如果我们需要在还不确定类型的时候就访问其中一个类型特有的属性或方法呢?

```typescript
interface Cat {
    name:string;
    run():void;
}

interface Fish {
    name:string;
    swim():void;
}

function isFish(animal: Cat | Fish) {
    if(typeof animal.swim === 'function'){
        return true
    }

    return false
}
// error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
// Property 'swim' does not exist on type 'Cat'. (swim 不是cat的属性)
```

此时可以使用类型断言,将`animal`断言成Fish

```typescript
interface Cat {
    name:string;
    run():void;
}

interface Fish {
    name:string;
    swim():void;
}

function isFish(animal: Cat | Fish) {
    if(typeof (animal as Fish).swim === 'function'){
        return true
    }

    return false
}
```

**类型断言只能跳过编译器的错误，无法避免运行时的错误**
```typescript
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function action(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};
action(tom);
```
编译不会报错，编译后如下：
```typescript
function action(animal) {
    animal.swim();
}
var tom = {
    name: 'Tom',
    run: function () { console.log('run'); }
};
action(tom);
// Uncaught TypeError: animal.swim is not a function
```
由于`animal`断言成Fish了，但是`action`函数接受的参数是`Cat | Fish`。一旦传了`Cat`类型的变量且`Cat`无`swim`方法时，就会导致运行报错
总之，使用类型断言时需要格外小心，尽量避免断言后调用方法或引用深层属性

### 2.将一个父类断言为更具体地子类

当类之间有继承关系时，类型断言也是很常见的：

```typescript
class ApiError extends Error {
    code: number = 0
}

class HttpError extends Error {
    statusCode: number = 200
}

function isApiError(error: Error){
    if(typeof (error as ApiError).code === 'number'){
        return true
    }
    return false
}
```

### 3.将任何一个类型断言为any

```typescript
window.foo = 1
// error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```
上面例子`window`不存在`foo`属性, 所以报错

解决办法：使用`as any`临时将window断言为`any`类型

```typescript
(window as any).foo = 1
```
在`any`类型的变量上，访问任何属性都是允许的

**但这个方法它极有可能掩盖了真正的类型错误，不要轻易使用**

### 4.将any断言为一个具体的类型

举个例子，在历史遗留的代码中有个`getCacheData`,它的返回值是`any`:

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key];
}
```

那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型。

```typescript
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface GirlFriend {
    name: string;
    run():void;
}

const wangOu =  getCacheData('wangOu') as GirlFriend
wangOu.run()
```

## 参考

-   [TypeScript 入门教程 - 类型断言](https://ts.xcatliu.com/basics/type-assertion)
