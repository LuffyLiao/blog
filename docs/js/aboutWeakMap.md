---
title: WeakMap
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - WeakMap
---
### WeakMap
`WeakMap`:弱映射，对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
#### weak的含义
WeakMap中的“weak”（弱），描述的是WeakMap对象持有的每个键对象的“弱引用”,这意味着没有其他引用存在时可以进行**垃圾回收**。

我们创建一个obj，`const obj = {}`，默认就创建了一个强引用的对象，只有手动将`obj = null`，它才会被垃圾回收机制回收，如果是弱引用对象，垃圾回收机制会自动帮我们回收。

举个例子：

如果我们使用`Map`的话，那么对象间是存在强引用关系：
```javascript
let obj = { name: "luffy" }
const target = new Map().set(obj,'coding')
obj = null
```
虽然手动将`obj`释放，但`target`依然对`obj`存在强引用关系，所以这部分内存依然无法被释放。

```javascript
let obj = { name: "luffy" }
const target = new WeakMap().set(obj,'coding')
obj = null
```
如果是`WeakMap`,`target`对`obj`就是弱引用关系，当下次垃圾回收机制执行时，这块内存就会被释放。
#### 语法
```javascript
new WeakMap([iterable])
```
`iterable`是一个数组（二元数组）或者其他可迭代的且其元素是键值对的对象
#### 基本API
`WeakMap`是`Map` 的兄弟类型，其API也是Map的子集。
```javascript
const wm = new WeakMap().set('key1','val1')
wm.has('key1') // true
wm.get('key1') // val1
wm.set('key2', 'val2').set('key3','val3') // 设置key2，key3
wm.delete('key3')  // 只删除这个键值对
~~wm.clear()~~ // 此方法已弃用
~~wm.size()~~  // 0 没有size方法
```