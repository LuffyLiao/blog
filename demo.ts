
// // 找错
// function createStr2<T>(first: T , second: T): T{
//     return `${first}${second}`
// }
// createStr<string, number>('1',1)

// function map<T>(params: T[]){
//     return params
// }
// map<string>('1')

// interface Item {
//     name: string
// }

// class MyName <T extends Item> { 
//     constructor(private data: T[]) {}

//     getItem(index: number): T{
//         return this.data[index]
//     }
// }

// const data = new MyName<number>([1])
// const data = new MyName([
//     {
//         name:'Luffy'
//     },
// ])

// const func: <T>(params: T) => number = hello

// function hello<T>(params: T){
//     return params
// }
