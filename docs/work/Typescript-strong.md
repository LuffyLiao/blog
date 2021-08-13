## ![ts-type-program.png](https://cdn.nlark.com/yuque/0/2021/png/543189/1619155106013-64438be7-fe96-44eb-96b6-cb26181146fd.png#clientId=u76df4b83-bff6-4&from=ui&id=ljkQc&margin=%5Bobject%20Object%5D&name=ts-type-program.png&originHeight=704&originWidth=1564&originalType=binary&size=73024&status=done&style=none&taskId=u5232ca87-47ad-4164-b9fc-cf308b8a9ef)
## 前言
**本次分享主要通过口述来讲解及分享Typescript类型编程及相关实践.此文主要用来辅助分享.**


> Typescript本身是图灵完备的.这意味着我们可以用它来做条件判断、递归...类型编程顾名思义便是对类型进行编程,本文主要通过介绍 Typescript高级类型和工具类型,带你走进Typescript类型编程.类型编程在实际业务中并不常见,通常在底层框架类库才会有此需求.

## ![ts1.png](https://cdn.nlark.com/yuque/0/2021/png/543189/1618929979519-66aab4e1-e8a8-432e-b65e-576ce1051294.png#clientId=u0f3ec273-933a-4&from=ui&height=391&id=N8mDL&margin=%5Bobject%20Object%5D&name=ts1.png&originHeight=391&originWidth=546&originalType=binary&size=57935&status=done&style=none&taskId=uc74fc73f-5910-4001-b42f-c5681abcba1&width=546)
## 类型守卫
> 类型保护允许你使用更小范围下的对象类型。

### typeof
```typescript
function substr(x:number|string){
	if(typeof x === 'string'){
    // ts推导出x的类型是string
  	console.log(x.substr(1))
    // 调用非字符串方法报错
    console.log(x.toFixed(1)) // Property 'toFixed' does not exist on type 'string'.
  }
}
```


### instanceof
```typescript
class Foo {
  foo = 123;
}

class Bar {
  bar = 123;
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ok
    console.log(arg.bar); // Error
  } else {
    // 这个块中，一定是 'Bar'
    console.log(arg.foo); // Error
    console.log(arg.bar); // ok
  }
}

doStuff(new Foo());
doStuff(new Bar());
```
### in
```typescript
interface A {
  x: number;
}

interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ('x' in q) {
    // q: A
  } else {
    // q: B
  }
}
```
### is
> 用来判断一个变量是否属于某个接口或类型,可以有效地缩小类型范围.常被用于限制返回值类型.



** 为什么使用is限制返回值类型,而不直接使用boolean类型 ? **👇 
```typescript
//boolean

const isString = (val: unknown): boolean => typeof val === "string";

function endsWith(val: unknown) {
  if (isString(val)) {
     val.endsWith("1"); // 编译时报错: Object is of type 'unknown'.
  }
}

function toFixed(val:any){
  // 编译时不会报错,但在运行时报错
  if(isString(val)){
    val.toFixed(2) 
  }
} 

```
```typescript
// is string

const isString = (val: unknown): val is string => typeof val === "string";

function endsWith(val: unknown) {
  if (isString(val)) {
     val.endsWith("1"); // 此时val被推断为string类型,可正常调用endsWith方法
  }
}

function toFixed(val:any){
  if(isString(val)){
    // 编译时报错,避免运行时错误
    val.toFixed(2) // Property 'toFixed' does not exist on type 'String'
  }
}
```
## 类型断言
> TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。**类型断言纯粹是一个编译时语法。**

```typescript
interface Foo {
    bar:number;
    bas:string;
}

// as Foo
const foo = {} as Foo;
// <Foo>
const foo1 = <Foo>{};

console.log(foo.bar,foo.bas)
console.log(foo1.bar,foo1.bas)
```
> 类型断言被认为是有害的,它只能**欺骗Typescript编译器,无法避免运行时错误.**

```typescript
function handler(x:number|string):number|string{
    return (x as number).toFixed(2)
}

handler("1.2") // 编译时不会报错,运行时报错:Uncaught TypeError: x.toFixed is not a function
```
### 非空断言
> 使用非空断言操作符 "!" 可以断言操作对象是非null和非undefined类型.

```typescript

function formatStr(str:string | undefined):string{
  // return str.slice(2) // Object is possibly 'undefined'.
  return str!.slice(2)
}

```
## 高级类型
### 交叉类型 (Intersection Types)
> 交叉类型是将多个类型合并为一个类型。这让我们可以把多种类型叠加到一起成为一种类型,它**包含了所需的所有类型的特性。**表示方法是 A & B



```typescript
interface IPerson {
  name: string;
  age: number;
}
interface IStudent {
  grade: number;
}

const getBio = (user: IPerson & IStudent) => {
  return `His name is ${user.name}, I am ${user.age} years old and a student of Grade ${user.grade}.`
}
getBio({name: "null", age: 12, grade: 6})
```


### 联合类型 (Union Types)
> 联合类型

```typescript
interface IPerson {
  name: string;
  age: number;
}
interface IStudent {
  grade: number;
}

const getBio = (user: IPerson | IStudent) => {
    if('grade' in user){
        console.log(user.grade)
    }else{
        console.log(user.name)
    }
}
getBio({name: "null", age: 12, grade: 6})
```
### 索引类型 (Indexable Types)
我们先来看一道场景题:
以下是一个get函数,用来获取某个对象的属性值.如何在Typescript中实现该函数呢 ?
```typescript
// 初级选手

interface Obj {
    [index:string]:string|number
}
function get(o: Obj, name: string) {
  return o[name]
}

const person = {
    name:'w',
    age:18
}

get(person,'name')
```
以上这个实现看起来好像没问题,那其实存在一些缺点:

1. 无法确认返回类型
1. 无法对key做约束
#### keyof操作符
> Typescript允许我们遍历某种属性的类型,并通过keyof操作符提取其属性名称.它可以获取某种类型的所有键,返回类型是联合类型.

```typescript
interface Person {
    name:string;
    age:number;
    height:number;
    weight:number;
}

type PersonNames = keyof Person // "name" | "age" | "height" | "weight"
```
#### 类型访问操作符
> 与js访问属性值的操作类似,Typescript访问类型的操作符也是通过[]来访问,也就是T[K].

```typescript
interface Person {
    name:string;
    age:number;
    height:number;
    weight:number;
}

type PersonNames = keyof Person // "name" | "age" | "height" | "weight"

type PersonTypes = Person[PersonNames]  // string | number
```
了解完上面两个操作符,我们再回头来实现get函数:
```typescript
function get<T,K extends keyof T>(o: T, name: K):T[K] {
  return o[name]
}

const person = {
    name:'w',
    age:18
}

get(person,'name')  // returnType: string
get(person,'age')   // returnType: number
get(person,'age1')  // Error: Argument of type '"age1"' is not assignable to parameter of type '"name" | "age"'.
```
### 映射类型 (Mapped Types)
> 映射类型的语法是 [K in Keys]:  ,其中的in可以理解为js中的 for ...in ,K 就是 key. 

```typescript
interface Person {
    name:string
    age:number
}

/**
 * type P = {
    name?: string | undefined;
    age?: number | undefined;
   }
*/
type P = {[K in keyof Person]?:Person[K]}
type Partial1<T> ={[K in keyof T]?:T[K]}
type P2 = Partial1<Person>

```
### 条件类型 (Conditional Types)
> Typescript中的条件类型有点类似于js中的三元条件运算符.以一个条件表达式进行类型关系检测,从而在两种类型中选择其一: T extends U ? X: Y

设计一个类型工具Diff<T,U>,我们要找出T类型中U不包含的部分:
```typescript
type Diff<T,U> = T extends U ? never: T;

type D = Diff<'a'|'b'|'c'|'d','a'|'d'> //  "b" | "c"
```
### infer关键字
> infer表示在extends 条件语句中待推断的类型变量.

```typescript
type ParamType<T> = T extends (param: infer P) => any ? P : T;

interface User {
  name: string;
  age: number;
}

type Func = (user: User) => void;

type Param = ParamType<Func>; // User
type AA = ParamType<string>; // string
```
## 工具类型
### Partial
```typescript
type TypedPartial<T> = { [P in keyof T]?: T[P] };
```
### Required
```typescript
type TypedRequired<T> = { [P in keyof T]-?: T[P] };
```
### Readonly
```typescript
type TypedReadonly<T> = { readonly [P in keyof T]: T[P] };
```
### Extract
```typescript
type TypedExtract<T, U> = T extends U ? T : never;
```
### Exclude
```typescript
type TypedExclude<T, U> = T extends U ? never : T;
```
### Record
```typescript
type TypedRecord<K extends keyof any, T> = { [P in K]: T };
```
### Pick
```typescript
type TypedPick<T, K extends keyof T> = { [P in K]: T[P] };
```
### Omit
```typescript
type TypedOmit<T, K> = Pick<T, Exclude<keyof T, K>>;
```
### ReturnType
```typescript
type TypedReturnType<T> =  T extends (...args:any[]):infer P ? P :any
```
## Vuex + Ts 实战
```typescript
├── store
  ├── index.ts
  ├── modules
  │   └── counter.ts
  └── types
      ├── counter.ts
      └── index.ts
```
```typescript
// index.ts
import { createStore } from "vuex";
import { Store } from "./types/index";
import { CounterModule } from "./modules/counter";

export const store = createStore({
  modules: {
    Counter: CounterModule,
  },
});

export function useStore(): Store {
  return store as Store;
}
```
```typescript
// modules/counter.ts

import { MutationTree, Module, ActionTree, GetterTree } from "vuex";
import { State as RootState } from "../types/index";
import {
  State,
  MutationTypes,
  Mutations,
  Actions,
  ActionTypes,
  Getters,
} from "../types/counter";

// state
const state: State = {
  counter: 0,
};

// mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_COUNTER](state: State, payload: number) {
    state.counter = payload;
  },
};

// actions
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.INC_COUNTER]({ commit }, count: number) {
    commit(MutationTypes.SET_COUNTER, state.counter + count);
  },
};

//getters
export const getters: GetterTree<State, RootState> & Getters = {
  doubleCounter: (state) => {
    return state.counter * 2;
  },
};

export const CounterModule: Module<State, RootState> = {
  // Namespacing Vuex modules is tricky and hard to type check with typescript.
  // Instead of namespacing, we could create our own namespacing mechanism by
  // prefixing the value of the TypeScript enum with the namespace, e.g.
  // namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

```
```typescript
// types/counter.ts

import {
  Store as VuexStore,
  ActionContext,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { State as RootState } from "./index";

//declare state
export type State = {
  counter: number;
};

// mutations and action enums
export enum MutationTypes {
  SET_COUNTER = "SET_COUNTER",
}

export enum ActionTypes {
  INC_COUNTER = "INC_COUNTER",
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.SET_COUNTER](state: S, payload: number): void;
};

//actions
export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

// actions interface
export interface Actions {
  [ActionTypes.INC_COUNTER](
    { commit }: AugmentedActionContext,
    count: number
  ): void;
}

// Getters types
export type Getters = {
  doubleCounter(state: State): number;
};

export type Store<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

```
```typescript
// types/index.ts

import { State as CounterState, Store as CounterStore } from "./counter";

export type State = {
  Counter: CounterState;
};

export type Store = CounterStore<Pick<State, "Counter">>;

```
