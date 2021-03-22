---
title: TypeScript - 字符串字面量类型
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串中的一个。
* * *
## 举个例子

```typescript

   type EventNames = 'click' | 'scroll' | 'mousemove'
   function handlerEvent(ele:Element,event: EventNames){
       console.log(ele)
       console.log(event)
   }

    handlerEvent(document.getElementById('test'),'scroll')  // 沒問題
    handlerEvent(document.getElementById('test'),'dblclick') // 報錯  
    // error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.

```
**类型别名与字符串字面量类型都是使用 type 进行定义。**

## 参考

-   [TypeScript 入门教程 - 字符串字面量类型](https://ts.xcatliu.com/advanced/string-literal-types.html)
