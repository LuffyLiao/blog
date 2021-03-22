---
title: TypeScript - 类型别名
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
tags:
---
## 类型别名
类型别名用来给一个类型起个新名字。
* * *
## 举个例子

```typescript

   type Name = string
   type NameResolver = () => string
   type NameOrResolver = Name | NameResolver

   function getName(n: NameOrResolver):Name {
       if(typeof n === 'string'){
           return n
       }else{
           return n()
       }
   }

```

## 参考

-   [TypeScript 入门教程 - 类型別名](https://ts.xcatliu.com/advanced/type-aliases.html)
