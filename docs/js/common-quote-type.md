## 基本类型和引用类型

### js堆栈概念

- js变量都存放在内存中，而内存给变量开辟了两块区域，分别为栈区域和堆区域
- 栈像个容器，容量小速度快
- 堆像个房间，容量较大

### 基础类型值存储

- 基本数据类型的值，占据固定大小的空间，保存栈内存中
- 栈遵从后进先出：声明一个变量，多次赋值取最后一个值

```javascript
var num = 10
num = 15
num = 20
console.log(num) // 20

var num2 = num
console.log(num2 === num1) // true

num2 = 30
console.log(num2 === num1) // false
```
### 引用类型值存储

- 引用类型（Object）的值是对象，保存在堆内存中

```javascript
var cat1 = {
    name: 'shiYi',
    age: 1
}
var cat2 = cat1
cat2.name = 'shiEr'
console.log(cat1.name) // shiEr
```




