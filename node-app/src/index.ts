const sayHello = (name: string) => {
  return `Hello, ${name}`;
};

console.log(sayHello(`Michael Jackson`));

process.stdout.write(sayHello(`Michael Jackson`));

const printLine = (text: string, breakLine: boolean = true) => {
  process.stdout.write(text + (breakLine ? "\n" : ""));
};

// ユーザーに質問を投げかけ、入力をしてもらう関数
const promptInput = async (text: string) => {
  printLine(`\n${text}\n>`, false);

  const input: string = await new Promise((resolve) =>
    process.stdin.once("data", (data) => resolve(data.toString()))
  );
  return input.trim();
};
