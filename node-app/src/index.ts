const printLine = (text: string, breakLine: boolean = true) => {
  process.stdout.write(text + (breakLine ? "\n" : ""));
};

const readLine = async () => {
  const input: string = await new Promise((resolve) =>
    process.stdin.once("data", (data) => resolve(data.toString()))
  );
  return input.trim();
};

// ユーザーに質問を投げかけ、入力をしてもらう関数
const promptInput = async (text: string) => {
  printLine(`\n${text}\n> `, false);
  return readLine();
};

// ユーザーに複数の選択肢から選ばせるプロンプトを表示する非同期関数
const promptSelect = async <T>(
  text: string,
  values: readonly T[]
): Promise<T> => {
  // 質問文を表示
  printLine(`\n${text}`);

  // 各選択肢を表示
  values.forEach((value) => {
    printLine(`- ${value}`);
  });

  // プロンプトを表示（入力を待機）
  printLine(`> `, false);

  // ユーザーの入力を待機
  const input = (await readLine()) as T;

  // 入力が選択肢に含まれているか確認
  if (values.includes(input)) {
    // 有効な入力の場合、その入力を返す
    return input;
  } else {
    // 無効な入力の場合、再度プロンプトを表示
    return promptSelect<T>(text, values);
  }
};

// どのゲームで遊ぶか選択する
class GameProcedure {
  // 現在選択されているゲームのタイトル
  private currentGameTitle = "hit and blow";

  // 現在選択されているゲームクラスのインスタンス
  private currentGame = new HitAndBlow();

  // ゲームの選択などの初期設定
  public async start() {
    await this.play();
  }

  // currentGameの実行
  private async play() {
    printLine(`===\n${this.currentGameTitle} を開始します。\n===`);
    await this.currentGame.setting();
    await this.currentGame.play();
    this.currentGame.end();
    this.end();
  }

  // アプリケーションの終了
  private end() {
    printLine("ゲームを終了しました。");
    process.exit();
  }
}

// modeの追加
const modes = ["normal", "hard"] as const;
type Mode = (typeof modes)[number];

// game: HitAndBlow
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
  private mode: Mode = "normal";

  // modeの設定
  async setting() {
    this.mode = await promptSelect<Mode>("モードを入力してください。", modes);
    const answerLength = this.getAnswerLength();

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
    const answerLength = this.getAnswerLength();
    const inputArr = (
      await promptInput(
        `「,」区切りで${answerLength}つの数字を入力してください`
      )
    ).split(",");

    if (!this.validate(inputArr)) {
      printLine("無効な入力です。");
      await this.play();
      return;
    }

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

  // ゲーム終了時の処理
  end() {
    printLine(`正解です! \n 試行回数: ${this.tryCount}回`);
    process.exit();
  }

  // check method: 受け取ったヒットの数とブローの数を算出する処理
  private check(input: string[]) {
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

  // validationの追加
  private validate(inputArr: string[]) {
    const isLengthValid = inputArr.length === this.answer.length;
    const isAllAnswerSourceOption = inputArr.every((val) =>
      this.answerSource.includes(val)
    );
    const isAllDifferentValues = inputArr.every(
      (val, i) => inputArr.indexOf(val) === i
    );
    return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues;
  }

  private getAnswerLength() {
    switch (this.mode) {
      case "normal":
        return 3;
      case "hard":
        return 4;
      default:
        const neverValue: never = this.mode;
        throw new Error(`${neverValue} は無効なモードです。`);
    }
  }
}

(async () => {
  new GameProcedure().start();
})();
