---
title: 执行上下文和作用域
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - 作用域
---
### 上下文和作用域

任何变量（不管包含的是原始值还是引用值）都存在于某个执行上下文中（也称为作用域）。这个作用域决定了变量的生命周期，以及他们可以访问代码的哪些部分。
- 作用域可以分为全局作用域，函数作用域，和块级作用域
- 内部作用域可以通过作用域链访问外部作用域中的一切，但外部作用域无法访问内部作用域中的任何东西。
- 作用域之间的连接是线性的、有序的，全局作用域只能访问全局作用域的变量和函数，不能直接访问局部作用域中的任何数据
- 变量的作用域用于确定什么时候释放内存

```javascript
var color = "blue"; 
function changeColor() { 
    let anotherColor = "red"; 
    function swapColors() { 
        let tempColor = anotherColor; 
        anotherColor = color; 
        color = tempColor; 
        // 这里可以访问 color、anotherColor 和 tempColor 
    } 
    // 这里可以访问 color 和 anotherColor，但访问不到 tempColor 
    swapColors(); 
} 
// 这里只能访问 color 
changeColor();
```
### var,let,const

`var、let、const`这些变量声明各有什么区别及特点，本文将从三个方面阐述他们差别：

- 变量提升机制及特点
- var和let/const的区别
- const命令

###  var变量提升机制及特点

变量提示机制：在函数作用域或者全局作用域中通过`var`声明的变量，都会被当成在当前作用域顶部声明的变量
```javascript
    function getAge(name){
        if(name){
            var age = 28
            return age
        }
        console.log(age) // undefined
    }
```

预编译阶段，其实等价于
```javascript
    function getAge(name){
        var age;
        if(name){
            age = 28
            return age
        }
        console.log(age) // undefined
    }
```

从上例可以看出，age的申明提升至函数顶部，而赋值操作在原位置完成
另外函数也有提升机制
```javascript
    console.log(age) // f age(){ console.log(28) }
    age()
    var age = 28
    function age(){
        console.log(28) // 28
    }

    age() // Uncaught TypeError: age is not a function
```
上述示例说明：函数提升与变量提升同时存在，函数提升优先级高于变量提升，
并且不会被变量声明覆盖，但是当变量赋值之后age函数被覆盖

另外，var在全局作用域时，它会创建一个全局对象（浏览器环境中的window对象）的属性
```javascript
    var age = 28
    console.log(age) // 28
    console.log(window.age) // 28

    console.log(window.Animation) // ƒ Animation() { [native code] }
    var Animation = 'hello,world'
    // 本来window对象中有Animation属性，所以会覆盖window.Animation的值
    console.log(window.Animation) // 'hello,world'
```
### 变量声明
####  var和let/const的区别

- 块级作用域
- 不存在变量提升
- 暂时性死区
- 不可重复声明
- let/const声明的全局变量不会挂在顶层对象上

1. 块级作用域
```javascript
    function fn(){
        let num = 5
        if(true){
            let num = 10
            console.log(num) // 10
        }
        console.log(num) // 5 
    }
```

2. 不存在变量提升
```javascript
    console.log(foo) // undefined
    var foo = 1

    console.log(bar) // 报错：ReferenceError
    let bar = 2
```

3. 暂时性死区
```javascript
    var foo = 1

    // 只要进入if{}这个作用域，所要使用的变量就已经存在，但在声明变量前不能获取或者使用
    if(true){
        foo = 2 // 报错 因为if{}这个区域有foo变量
        let foo; 
    }
```
作用：减少运行时错误，防止在变量声明前就使用

4. 不允许重复声明变量
`let`、`const`不允许在相同作用域内，重复声明同一个变量

```javascript
    function foo(test){
        let test; // 报错 Uncaught SyntaxError
    }

    function bar(test){
        {
            let test; // 不报错
        }
    }
```

5. let/const声明的全局变量不会挂在顶层对象上(window/global)

上面也说了var声明全局会挂在顶层对象上，但是let/const不会
```javascript
    let foo = 1
    window.foo // undefined
```
###  const命令

1. 声明的时候就需要赋值
```javascript
    let foo;
    var bar; // 不报错
    const test; // 报错 Uncaught SyntaxError
```

2. 常量，一旦声明，不能改变他的值
简单类型：值不能改变
```javascript
    const num = 1
    num = 2 // 报错 Uncaught TypeError
```
复杂类型：变量指针不能变，但对象的建则不受限制
```javascript
    const arr = [1]
    const obj = {
        name : 'Tom'
    }

    arr[0] = 2 // 不报错
    obj.name = 'Jack' // 不报错

    arr = [2] // 报错
    obj = {
        name: 'Jack' // 报错
    }
```



