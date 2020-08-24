## 数据类型

`ECMAScript` 中有 5 种基本数据类型： `Undefined` 、 `Null` 、 `Boolean` 、 `Number`
和 `String` 。还有一种复杂数据类型：`Object`


## Undefined 类型

`Undefined` 类型只有一个值，即特殊的 `undefined` 。在使用 var 声明变量但未对其加以初始化时，
这个变量的值就是 `undefined` ，例如

```javascript
var message ;
alert(message == undefined);  // true
```
## Null 类型

`Null` 类型是第二个只有一个值的数据类型，这个特殊的值是 `null` 。从逻辑角度来看， null 值表
示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回 "object" 的原因

```javascript
var message = null ;
alert(typeof message);  // object
```

## Boolean 类型

该类型只有两个字面值： true 和 false




