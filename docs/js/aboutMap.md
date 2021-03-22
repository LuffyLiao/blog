---
title: Map
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - Map
---
### Map
Map 是一种新的集合类型，是一种键/值存储机制。能记住键的原始插入顺序，其中键可以是任何值（对象或原始值）

#### Map与Object的区别
**键的类型**
Map的键可以是任何值，包括函数、对象或任何基本类型。而Object的键必须是一个`String`或`Symbol`。如果向其添加了`Object`或`Array`类型，最终也会转换成`String`
```javascript
let obj = new Object()
let map = new Map()

let objKey = {}
let arrKey = []
let strKey = 'string'

obj[objKey] = '这是一个对象'
obj[arrKey] = '这是一个数组'
obj[strKey] = '这是一个字符串'
console.log('obj', obj)

map.set(objKey, '这是一个对象')
map.set(arrKey, '这是一个数组')
map.set(strKey, '这是一个字符串')
console.log('map', map)
```
输出结果如下:
![avatar](./images/map-01.png)

#### 基本API
初始化映射
```javascript
const map = new Map([
    ['key1', 'val1'],
    ['key2', 'val2'],
    ['key3', 'val3'],
])
```
**size**: 键值对的个数，但是map的length是undefined。
```javascript
map.size // 3
map.length // undefined
```
**set()**添加键值对，**get()**和**has()**进行查询，**delete()** 和 **clear()**删除值。

```javascript
map.has('key1') // true
map.get('key1') // val1
map.set('key4', 'val4') // 设置key4
map.delete('key3')  // 只删除这个键值对
map.clear() // 清空这个映射实例的所有键值对
map.size()  // 0

// set方法返回的是映射实例，所以还可以把多个操作连起来
const m = new Map().set('key','val')
m.set('key2','val2')
m.set('key3','val3')
m.size // 3
```