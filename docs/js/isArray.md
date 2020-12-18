
### 判断是否是数组
1. typeof肯定是不行的。

    typeof检测基本数据类型没有问题，但是判断引用类型的时候就不行了
    ```javascript
    // 基本类型
    typeof 1；// number
    typeof 'one' // string
    typeof true // boolean
    typeof undefined // undefined
    let s = Symbol
    type of s // symbol
    typeof null // boject
    
    // 引用类型
    typeof [1,2,3] // object
    typeof {1,2,3} // object
    typeof function // function
    typeof Araay // function Array 类型的构造函数 ，同理Object，Number....
    ```
2. 两种简单，但不是很准确的方法
    ```javascript
    var arr = [1,2,3]
    arr.constructor === Array   // return true
    arr instanceof Array            // return true 

    constructor 不准确的原因？因为constructor 可以被重写，所以不能确保一定是数组
    var str = 'str'
    str.construtor = Array 
    str.construtor === Array // return true
    
    // instanceof 不准确的原因？（待补充）
    ```
3. es6 语法： Array.isArray (准确便捷)
    ```javascript
    var arr = [1,2,3]
    Array.isArray(arr) // true
    ```

4. Object.prototype.toString 
   
   每个继承自Object的对象都拥有toString的方法，如果浏览器不支持Array.isArray，则使用此方法
    ```javascript
    var arr = [1,2,3]
    Object.prototype.toString.call(arr) === '[object Array]' // true 
    
    // 所以可以封装一个方法来进行判断

    if(!Array.isArray){
        Array.isArray = function(arg){
            return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
    ```