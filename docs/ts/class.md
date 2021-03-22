---
title: 类
date: '2021-03-22 08:00:00'
sidebar: 'auto'
categories:
 - TypeScript
 - ES6
tags:
 - 类与接口
 - ES6
 - Class
---
## 类(class)
* * *
### ES6中类的用法

** 属性和方法 **
使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。
```typescript
    class Students {
        public name;
        constructor(name){
            this.name = name 
        }
        sayHi(){
            return `My name is ${this.name}`
        }
    }

    let luffy = nem Animal('Luffy')
    console.log(luffy.sayHi()) // My name is Luffy
```
**类的继承**

使用 `extends` 关键字实现继承，子类中使用 `super `关键字来调用父类的构造函数和方法。
 ```typescript
    class Grand extends Students {
        constructor(name){
            super(name) // 调用父类的constructor(name) 
            console.log(this.name)
        }
        sayHi(){
            return `LiLei,` + super.sayHi() // 调用父类的sayHi
        }

        let five = new Grand('Five') // Five
        console.log(five.sayHi())    // LiLei,Myname is Five
    }
```
**存取器**

使用 getter 和 setter 可以改变属性的赋值和读取行为：

```typescript
    class Students {
        constructor(name) {
            this.name = name;
        }
        get name() {
            return 'Jack';
        }
        set name(value) {
            console.log('setter: ' + value);
        }
    }

    let kitty = new Animal('Kitty'); // setter: Kitty
    kitty.name = 'Tom'; // setter: Tom
    console.log(kitty.name); // Jack
```
**静态方法**

使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```typescript
    class Animal {
        static isAnimal(a) {
            return a instanceof Animal;
        }
    }

    let jack = new Animal('Jack');
    Animal.isAnimal(jack); // true
    jack.isAnimal(jack); // TypeError: jack.isAnimal is not a function
```
### ES7中类的用法

**实例属性**

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

```typescript
    class Animal {
        name = 'Jack';

        constructor() {
            // ...
        }
    }

    let jack = new Animal();
    console.log(jack.name); // Jack
```

**静态属性**

ES7 提案中，可以使用 `static` 定义一个静态属性：

```typescript
    class Animal {
        static num = 42;

        constructor() {
            // ...
        }
    }

    console.log(Animal.num); // 42
   
```
## TypeScript 中类的用法

**public private 和 protected**

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public`修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

### 举个例子
```typescript
    class Students {
        public name;
        public constructor(name) {
            this.name = name;
        }
    }

    let a = new Students('Jack');
    console.log(a.name); // Jack
    a.name = 'Tom';
    console.log(a.name); // Tom
```
上面的例子中， `name` 被设置为了 `public`，所以直接访问实例的 `name` 属性是允许的。

那如果我们希望有的属性是无法直接存取呢？这时候就可以用 private 了：

```typescript
    class Students {
        private name;
        public constructor(name) {
            this.name = name;
        }
    }

    let a = new Students('Jack');
    console.log(a.name); // Jack
    a.name = 'Tom'; // Property 'name' is private and only accessible within class 'Students'.
```
使用 `private` 修饰的属性或方法，在子类中也是不允许访问的：

```typescript
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name); // Property 'name' is private and only accessible within class 'Animal'.
  }
}
```
如果我们想要子类允许访问，则可以使用 `protected` 修饰

```typescript
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}

```
当构造函数修饰为 `private` 时，该类不允许被继承或者实例化：

```typescript
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal { // Cannot extend a class 'Animal'. Class constructor is marked as private.
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack'); // Constructor of class 'Animal' is private and only accessible within the class declaration.
```
当构造函数修饰为 `protected` 时，该类只允许被继承：

```typescript
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack'); // Constructor of class 'Animal' is private and only accessible within the class declaration.
```
**参数属性**

修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值

```typescript
class Animal {
    // public name: string;
    public constructor(public name) {
        // this.name = name;
    }
}
```
**readonly**

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。

```typescript
class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        // this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom'; // Cannot assign to 'name' because it is a read-only property.
```

### 类的类型

给类加上 TypeScript 的类型很简单，与接口类似：

```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
        return `My name is ${this.name}`;
    }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

## 参考

-   [TypeScript 入门教程 - 类](https://ts.xcatliu.com/advanced/class.html)
