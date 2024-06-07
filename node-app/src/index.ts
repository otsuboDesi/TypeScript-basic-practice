const printLine = (text: string, breakLine: boolean = true) => {
  process.stdout.write(text + (breakLine ? "\n" : ""));
};

// ユーザーに質問を投げかけ、入力をしてもらう関数
const promptInput = async (text: string) => {
  printLine(`\n${text}\n> `, false);

  const input: string = await new Promise((resolve) =>
    process.stdin.once("data", (data) => resolve(data.toString()))
  );
  return input.trim();
};

class HitAndBlow {
  private readonly answerSource = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  private answer: string[] = [];
  private tryCount = 0;

  setting() {
    const answerLength = 3;

    // 以下の処理をanswer配列が所定の数埋まるまで繰り返す
    while (this.answer.length < answerLength) {
      // answerSourceからランダムに値を１つ取り出す
      const randNum = Math.floor(Math.random() * this.answerSource.length);
      const selectedItem = this.answerSource[randNum];

      //   まだその値が使用されていないのであれば「answer」配列に追加する
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem);
      }
    }
  }

  // ゲームそのものの処理
  async play() {
    const inputArr = (
      await promptInput("「,」区切りで3つの数字を入力してください")
    ).split(",");
    const result = this.check(inputArr);

    if (result.hit !== this.answer.length) {
      // 不正解だったら続ける
      printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`);
      this.tryCount += 1;
      await this.play();
    } else {
      // 正解だったら終了
      this.tryCount += 1;
    }
  }

  // check method: 受け取ったヒットの数とブローの数を算出する処理
  check(input: string[]) {
    let hitCount = 0;
    let blowCount = 0;

    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1;
      } else if (this.answer.includes(val)) {
        blowCount += 1;
      }
    });

    // ヒットの数とブローの数を算出
    return {
      hit: hitCount,
      blow: blowCount,
    };
  }
}

(async () => {
  const hitAndBlow = new HitAndBlow();
  hitAndBlow.setting();
})();
