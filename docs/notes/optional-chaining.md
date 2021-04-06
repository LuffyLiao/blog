---
title: 可选链 && 双问号
date: 2021-04-01 15:59:35
sidebar: 'auto'
categories: 
 - 零散笔记
---
### 可选链 ?.
以前的你肯定是这么写
```javascript
let info = data && data.info
```
有了可选链，你可以这么写
```javascript
let info = data?.info
```
这个【可选链】的意思是，如果?.左边的值不是`null`或者`undefined`，那么就返回`data.info`，否则返回`undefined`
### 双问号 ??
但还是会不太方便，比如
```javascript
let num = res?.data?.status || 100
```
如果你希望res或者res.data或者res.data.status不存在（值为null或者undefined）时，num为100。
但是上面的代码在status为0时，num也是100。
现在，你可以用新语法【双问号】
```javascript
let num = res?.data?.status??100
```

这个【双问号】的意思是，如果??左边的值是`null`或者`undefined`，那么就返回右边的值