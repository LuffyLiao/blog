### 数据类型

`ECMAScript` 中有 5 种基本数据类型： `Undefined` 、 `Null` 、 `Boolean` 、 `Number`
和 `String` 。还有一种复杂数据类型：`Object`


### Undefined 类型

`Undefined` 类型只有一个值，即特殊的 `undefined` 。在使用 var 声明变量但未对其加以初始化时，
这个变量的值就是 `undefined` ，例如

```javascript
var message ;
alert(message == undefined);  // true
```
### Null 类型

`Null` 类型是第二个只有一个值的数据类型，这个特殊的值是 `null` 。从逻辑角度来看， null 值表
示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回 "object" 的原因

```javascript
var message = null ;
alert(typeof message);  // object
```

### Boolean 类型

该类型只有两个字面值： true 和 false

### Number 类型

1. 浮点数值：数值中必须包含一个小数点，并且小数点后必须至少有个数字

```javascript
var floatNum1 = 1.2 ;
var floatNum2 = .2; // 有效，但不推荐
```

2. 数值范围
由于内存的限制，ECMAScript表示的最小数值保存在Number.MIN_VALUE中，在大多数浏览器中，这个数值是5e-324,能够表示的最大值保存在Number.MAX_VALUE中，在大多数浏览器中，这个数值是1.7976931348623157e+308。如果超出范围则自动转换成Infinity和-Infinity。

3. NaN
NaN, Not a Number 是一个特殊的数值。它有两个特点：①NaN和任何值都不相等包括它本身。②任何涉及NaN的操作 都会返回NaN。

4. 数值转换
① Number():
```javascript
Number(true); // 1 ,false则为0
Number(1); // 1 ，如果是数字值，则简单返回
Number(null); // 0 
Number(undefined); // NaN 
Number('1.2'); // 1.2 ,只含数字的字符串，则转换为十进制数值
Number('hello world') // NaN
```
5. String类型
即字符串，可以由双引号（“）或者单引号（’）表示

```javascript
var firstName = 'Luffy'
var lastName = "luffy"
```

- 字符字面量
string 数据类型包含一些特殊的字符字面量，也叫转义系列。用于表示非打印字符，或者具有其他用途的字符。常用的转义符如下：
\n : 换行  \t : 制表    \b :  空格    \r ：回车   \\ 斜杆 

- 字符串的特点
ECMAScript中的字符串是不可变的，一旦被创建，它们的值就不能改变。要改变某个变量保存的字符串，首先要销毁原来的字符串。然后再用另一个包含新值的字符串填充该变量。
```javascript
let lang = 'Java'
lang = lang + 'Script'
```
以上示例，首先创建一个能容纳10个字符的新字符串，然后在这个字符串中填充'Java'和'Script'。最后一步是销毁原来的字符串。

- 转换为字符串
toString() 方法
 

