---
title: Object
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - 内置对象
---
### Object
创建Object实例的两种方式

- new操作符和Object构造函数
```javascript
let person = new Object()
person.name = 'luffy'
person.age = 28
```
- 对象字面量表示法
 ```javascript
let person = {
    name: 'luffy'
    age: 28
}
```
对象字面量在函数传参上的运用
```javascript
function fn(args){
    let output = ''
    if(typeof args.name == 'string'){
        output += 'Name: ' + args.name
    }
    if(typeof args.age == 'number'){
        output += 'Name: ' + args.name
    }
}
fn({
    name: 'luffy',
    age: 28
})
fn({
    name: 'suolong'
})
```
这种模式适合函数有大量可选参数的情况，通过对象字面量封装多个可选参数

### Array
1. 创建数组的几种方式
- new + Array构造函数（new可以省略）
```javascript
let colors = Array(3) // 创建一个包含 3 个元素的数组
```
- 数组字面量表示法 
```javascript
let colors = ['red', 'blue', 'green']
let arr = []
let values = [1, 'str', true]
```
- Array.from：将类数组结构转换为数组实例
```javascript
// 1. 字符串会被拆分成单字符数组
console.log(Array.from('Matt')) // ['M','a','t','t']

// 2. 对现有数组进行浅拷贝
const arr = [1, 2, 3, 4 ]
const arr2 = Array.from(arr) // [1,2,3,4]
arr == arr2 // false
```
- Array.of：将一组参数转换为数组实例

```javascript
console.log(Array.of(1,2,3,4)) // [1, 2, 3, 4]
// 用于代替ES5的Array.prototype.slice.call(args)
console.log(Array.prototype.slice.call(1,2,3,4)) // [1, 2, 3, 4]
```
2. 迭代器方法
ES6中，Array原型上暴露了3个用于检索数组内容的方法：keys()、values()和entries()。
keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而entries()返回索引/值的迭代器
```javascript
const a = ['foo', 'bar', 'baz', 'qux']
// 因为这些方法都是返回迭代器，所以通过Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys()) // [0,1,2,3]
const aValues = Array.from(a.values()) // ['foo','bar','baz','qux']
const aEntries = Array.from(a.entries()) // [[0,'foo'],[1,'bar'],[2,'baz',[3,'qux']]
```
3. 复制和填充方法
- copyWithin(): 批量复制方法
```javascript
let ints,
reset = () => ints = [0,1,2,3,4,5,6,7,8,9]
reset()
/**
 * 第一个参数：插入位置开始的索引，
 * 第二个参数：复制位置开始的索引，默认是0，
 * 第三个参数：是复制位置结束的索引。在源索引或目标索引到达数组边界时停止,
 * 静默忽略超出数组边界、零长度及方向相反的索引范围
 */
ints.copyWithin(5)
console.log(ints) // [0,1,2,3,4,0,1,2,3,4]
ints.copyWithin(0, 5)
console.log(ints) // [5,6,7,8,9,5,6,7,8,9]
ints.copyWithin(4, 0, 3) // 从索引0开始到3结束，插入到4的位置
console.log(ints) // [0,1,2,3,0,1,2,7,8,9]
```
- fill(): 填充数组,参数含义与上copyWithin类似
```javascript
const zeros = [0,0,0,0,0]

// 用5填充整个数组
zeros.fill(5)  // [5,5,5,5,5]

// 用6填充索引大于等于3的元素
zeroes.fill(6,3) // [0,0,0,6,6]

// 用7填充索引大于等于1且小于3的元素
zeroes.fill(7,1,3) // [0,7,7,0,0]
```

