export {};

// 配列型型推論
const nameList = ["dog", "cat", "bird"];
nameList[0].toUpperCase();

const ageList = [20, 18, 15];
// ageList[0].toUpperCase()
// error: Property 'toUpperCase' does not exist on type 'number'

// オブジェクト型型推論

// person変数が解釈されている
const person = {
  name: "Michael Jackson",
  age: 20,
};

const personName: string = person.name;
const personAge: number = person.age;
// const personHeight: number= person.height
// error: Property 'height' does not exist on type '{ name: string; age: number; }'

// 関数型の型推論
const sayHello = (name: string): string => {
  return `Hello, $[name]`;
};

const val1 = sayHello("Micael Jackson");
// const val2 = sayHello(123);
// error:Argument of type 'number' is not assignable to parameter of type 'string'.
