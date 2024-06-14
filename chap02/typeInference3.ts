interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

// getFullName関数の戻り値の型が推論されているため、型の指定(: string)が省略されている
const getFullName = (person: Person) => {
  return `${person.firstName} ${person.lastName}`;
};

// getFullName関数が(person: Person) => string型であると推論されているため、
// そのstring型の戻り値に対してtoUpperCaseメソッドを呼び出せている
const largeFullName = getFullName({
  firstName: "Michael",
  lastName: "Jackson",
  age: 74,
}).toUpperCase();
// MICHAEL JACKSON
