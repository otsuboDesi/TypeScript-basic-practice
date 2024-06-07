const sayHello = (name: string) => {
  return `Hello, ${name}`;
};

console.log(sayHello(`Michael Jackson`));

process.stdout.write(sayHello(`Michael Jackson`));
