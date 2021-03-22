---
title: 原始值包装类型
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - 数据类型
---
### 原始值包装类型 Boolean、Number、String
每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象
```javascript
let s1 = 'str'
let s2 = s1.substring(1)
```
s1 是一个字符串的变量，是一个原始值，但是原始值本身不是对象，逻辑上不应该有substing()方法。

为什么呢？

其实在以读模式访问字符串值的任何时候，后台都会执行以下3步
- 创建一个String类型的实例
- 调用实例上的特定方法
- 涉及原始值的语句执行完毕后，销毁实例

可以想象成执行了如下程序
```javascript
let s1 = new String('str')
let s2 = s1.substring(1)
s1 = null
```

这种行为叫做String包装类型，同样的也有Boolean和Number包装类型

