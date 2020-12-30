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
