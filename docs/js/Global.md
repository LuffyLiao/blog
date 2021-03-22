---
title: JS内置对象
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - 内置对象
---
### Global：全局作用域中存在的内置对象
在全局作用域中定义的变量和函数都会成为Global对象的属性，包括isNaN()，isFinite()，perseInt()和parseFloat()，实际上都是Global对象的方法

1. eval()方法
这个方法是一个完整的ECMAScript解释器，接收一个参数，即一个要执行的JavaScript字符串。
```JavaScript
let msg = 'hello world'
eval('console.log(msg)') // hello world
```
通过eval()定义的任何变量和函数都不会被提升，因为它们只是在eval()执行的时候才会被创建。

```JavaScript
eval("let msg = 'hello world'")
console.log(msg) // msg is not defined
```

**慎用**，虽然eval能力强大，但是也非常危险，容易遭受XSS攻击

2. window 和 global
浏览器中将window对象实现为Global对象的代理，因此，所有全局作用域中声明的变量和函数都变成了window的属性。
```javascript
// 获取Global对象的方法
let global = function(){
    return this
}()
```
当一个函数在没有明确指定this值的情况下执行时，this值等于Global对象。

### Math：全局作用域中的另一个全局对象
```javascript
Math.ceil() // 向上整数
Math.floor() // 向下取整
Math.round() // 四舍五入成整数
Math.random() // 取随机数
....
```
