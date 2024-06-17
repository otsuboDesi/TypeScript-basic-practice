class Application {
  start() {
    console.log("hello world");
    const button = document.getElementById("deleteAllDoneTask");

    if (!button) return;
    console.log(button);
  }
}

// windowsのloadイベントのハンドラでApplicationクラスのインスタンスを作成
// loadはローディング工程がすべて終わった後に呼ばれるイベント
// loadが呼ばれた時点で、HTMLは全てDOMとして取得でき、画像などのassetsのロードも完了している
window.addEventListener("load", () => {
  const app = new Application();
  // start()を実行する
  app.start();
});
