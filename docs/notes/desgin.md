---
title: 设计模式
date: 2021-06-06 22:29:06
sidebar: 'auto'
categories: 
 - 日常笔记
---
### 什么是设计模式？
设计模式，简单来讲就是一种常见问题的典型解决方案。目的是为了可重用代码，提高代码的扩展性和维护性。

说白了，就是一种**套路**，举个栗子，我们小时候玩小霸王游戏，第一次通关花了8小时，第二次通关花了4小时，后面越玩越简单，越玩越快通关，因为你已经知道了这游戏的捷径和难点，所以你按这个`套路`，很快的就能再一次通关。

### SOLID原则
SOLID 是让软件设计更易于理解、更加灵活和更易于维护的五个原则的简称。

**1. 单一职责原则**：修改一个类的原因只能有一个。对象不应该承担太多的职责，否则，一个职责的变化会削弱或抑制这个类实现其他职责的能力。同时也会增加代码的复杂度。
**2. 开闭原则**：对于扩展，类应该是“开放”的；对于修改，类则应是“封闭”的。
**3. 里氏替换原则**：如果我们调用一个父类的方法可以成功，那么替换成子类调用也应该完全可以运行。`？`
**4. 里氏替换原则**：将臃肿庞大的接口拆分成更小的和更具体的接口
**5. 依赖倒置原则**：要面向接口编程，不要面向实现编程。

**与生活中所有事情一样，盲目遵守这些原则可能会弊大于利。**

### 设计模式的分类
可以分为三大类：创建型模式、结构型模式、行为型模式
- 创建型模式：
    - 创建型模式提供了创建对象的机制，能够提升已有代码的灵活性和可复用性。
    - 这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式。
    - 包括：简单工厂模式、工厂方法模式、 抽象工厂模式、单例模式、生成器模式、原型模式
    
- 结构型模式：
    - 结构型模式介绍如何将对象和类组装成较大的结构， 并同时保持结构的灵活和高效。
    - 包括：外观模式、适配器模式、桥接模式、代理模式、装饰者模式、享元模式
- 行为型模式：
    - 这些设计模式特别关注对象之间的通信。
    - 包括：职责链模式、外观模式、命令模式、解释器模式、迭代器模式、中介者模式、备忘录模式、观察者模式、状态模式、策略模式、模板方法模式、访问者模式
### 工厂模式

#### 举个例子
现实生活中，原始社会自给自足（没有工厂），农耕社会小作坊（简单工厂），工业革命流水线（工厂方法），现代产业链代工厂（抽象工厂）。

其实我们熟悉的jQuery就是一个工厂模式


```javascript
// 经典案例 - jquery
class jQuery {
    construtor(selector){
        let elements = Array.from(document.querySelectorAll(selector))
        let length = elements ? elements.length : 0
        for(let i=0;i<length;i++){
            this[i] = elements[i
        }
        this.length = length
    }
    html()
}

window.$ = function(selector){
    return new jQuery(selector)
}
```
### 简单工厂模式
又叫静态工厂模式。是由一个工厂对象决定创建出哪一种产品类的实例。
#### 举个例子
我们写一个模态框，成功和失败都是继承于modal。

```javascript
// 简单工厂模式代码
class Modal {
    constructor(status){
        this.status = status
    }

    getTitle(){
        console.log('title');
    }
}

class SuccessModal extends Modal {
    constructor(title){
        super(status)
        this.title = '成功：' + title
        console.log(this.title);
    }
}

class ErrorModal extends Modal {
    constructor(title){
        super(status)
        this.title = '失败：' + title
        console.log(this.title);
    }
}
// 特点：根据不同的参数返回不同的类

switch (status){
   case 'success':
       new SuccessModal('这是一个简单工厂模式的模态框', status)
       break
   case 'error':
      new ErrorModal('这是一个简单工厂模式的模态框', status)
       break
   default:
       break
}
```
#### [结构图](https://www.processon.com/diagraming/60b9aee8e0b34d64bfcb571b)

#### 优缺点

**优点**
1. 可以根据参数的不同返回不同类的实例
2. 维护现有的代码比较方便，易于找到对应位置

**缺点**
1. 可扩展性差，新增产品得重新写一套

### 工厂方法模式

定义一个用于创建对象的接口，让子类决定实例化哪一个类。Factory Method 使一个类的实例化延迟到其子类。

#### 举个例子
现在产品大大需要新增一个告警模态框，同时要求，成功后跳转到首页，失败后弹窗提示
```javascript
class Modal{
    constructor(title) {
        this.title=title;
    }
    getTitle() {
        console.log('this.title');    
    }
}
class SuccessModal extends Modal{
    constructor(title) {
       super(name);
       this.title=title;
    }
    goHome (url) {
        setTimeout(() => {
          window.location.href = url;
        }, 3000);
    }
}
class WarningModal extends Modal{
    constructor(title) {
       super(title);
       this.title=title;
    }
} 
class ErrorModal extends Modal{
    constructor(title) {
       super(title);
       this.title=title;
    }
}
class SuccessModalFactory{
    create() {
        return new SuccessModal('成功');
    }
}
class WarningModalFactory{
    create() {
        return new WarningModal('告警');
    }
}
class ErrorModalFactory{
    create() {
        return new WarningModal('失败');
    }
}
const settings={
    'success': SuccessModalFactory,
    'warning': WarningModalFactory,
    'error': ErrorModalFactory
}

let success=new settings['success']().create();

let warning=new settings['warning']().create();

let error=new settings['warning']().create();

```
#### [结构图](https://www.processon.com/diagraming/60b45da41e08532bd00c65fb)

#### 优缺点
**优点**
1. 避免产品之间的紧密耦合
2. 单一原则
3. 开闭原则：无需更改现有父类的代码，就可以生成新的产品

**缺点**
工厂方法中，每创建一种具体的子类，就要写一个对应的 ConcreteCreate，这相对比较笨重

### 抽象工厂模式（略）

### 单例模式

#### 什么是单例模式 

顾名思义，单例.，就是保证只有一个实例，实现方法一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

例如：jQuery

```javascript
if(window.jQuery !== null){
    return window.jQuery
}else{
    // init
}
```

#### 举个例子
如果你想页面中最多只存在一个可用的实例，那么就可用使用单例模式，例如：登录框，公共弹窗...
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <button id="show-btn">显示登录框</button>
    <button id="hide-btn">隐藏登录框</button>
    <script>
        class Login {
            constructor() {
                this.element = document.createElement('div');
                this.element.innerHTML = (
                    `
                     用户名 <input name="username"/>
                     密码 <input name="password"/>
                     <input type="submit" value="登录"/>
                    `
                );
                this.element.style.cssText = `width:100px;height:100px;position:absolute;left:50%;top:50%;margin-top:-50px;margin-left:-50px;display:none`;
                document.body.appendChild(this.element);
            }
            show() {
                this.element.style.display = 'block';
            }
            hide() {
                this.element.style.display = 'none';
            }
            static getInstance() {
                if (!this.instance) {
                    this.instance = new Login();
                }
                return this.instance;
            }
        }
        document.getElementById('show-btn').addEventListener('click', function () {
            Login.getInstance().show();
        });
        document.getElementById('hide-btn').addEventListener('click', function () {
            Login.getInstance().hide();
        });
    </script>
</body>

</html>

```
#### [结构图](https://www.processon.com/diagraming/60b9af1bf346fb5e0b1c278a)

#### 优缺点
**优点**
1. 确保了一个类只有一个实例对象，比如登录框，全局遮罩，这种情况，创建一个实例，减少内存开销

**缺点**
1. 就是使用这个类的使用者必须知道这是一个单例的类，必须主动调用getInstance方法,使用麻烦
### 生成器模式
生成器模式是一种创建型设计模式， 使你能够分步骤创建复杂对象。 该模式允许你使用相同的创建代码生成不同类型和形式的对象。

#### 举个例子
工厂中，制作一瓶饮料需要很多步骤，而其中吹瓶是通用的，可以用瓶子装很多东西。那么这个是怎么灵活扩展的呢？

在工厂流水线的例子中，流水线就是生成器，一个流水线可以不通过不同组合生成不同作用的工厂，红茶的流水线可以理解为 new Builder().吹瓶().放入红茶().build()，绿茶的流水线可以理解为 new Builder().吹瓶().放入绿茶().build()，我们可以复用生成器最基础的函数 吹瓶() 将其用于创建不同的产品中，复用了组装基础能力。

```javascript
class Director {
  create(concreteBuilder: ConcreteBuilder) {
    // 创建了一些零件
    concreteBuilder.buildA();
    concreteBuilder.buildB();

    // 生成实例
    return concreteBuilder.build();
  }
}

class DrinkBuilder {
  public buildA() {
    // 吹瓶子
    // this.xxx = xxx
  }

  public buildB() {
    // 装饮料
  }

  public build() {
    // 最终创建实例
    return new Drink(/* ..一堆参数 this.xxx.. */);
  }
}

// 使用
const director = new Director();
const builder = DrinkBuilder();
const drink = director.create(builder);
```
#### 构造图
[构造图](https://www.processon.com/diagraming/60b9c17b5653bb1873579a6a)
#### 适用场景
1. 在可选参数较多时，比如饮料，有加糖，加水，加蜂蜜，香精....
2. 在需要创建不同形式的产品时，比如我们需要生产红茶，绿茶。工厂有吹瓶，投料等工艺
#### 生成器模式优缺点
**优点：**
- 可以简化构造函数，避免重复构造函数
- 生成不同形式产品时，可以复用相同的制造代码
- 单一原则，可以将每种产品生成代码抽到同一位置，便于维护

**缺点：**
- 代码复杂程度会有所增加

### 原型模式
**原型模式**是一种创建型设计模式， 使你能够复制已有对象， 而又无需使代码依赖它们所属的类。

#### 举个例子
为了房屋安全，要尽量做到一把钥匙只能开一扇门，每把钥匙结构都多多少少不一样，却又很相似，做钥匙的人按照你给的钥匙一模一样做一个新的，这属于什么模式呢？

#### 构造图
[构造图]()

#### 应用场景
591广告模块
```javascript
// 構造函數原型對象
Union.prototype = {
    // 初始化對象
    init: function () {
        this.getScript(this.scriptUrl)

        // 創建回調函數
        this.callbackFun()
    },
    ....
}

window.UNION_SHOW = Union

// 使用时
UNION_SHOW()
```

#### 优缺点
**优点**
1. 工厂类集中了所有对象的创建，便于对象创建的统一管理,且可以大量创建

**缺点**
1. 对已有的类进行改造时，需要修改源代码，违背了“开闭原则”。