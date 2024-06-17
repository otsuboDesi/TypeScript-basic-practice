import { EventListener } from "./EventListener";

class Application {
  start() {
    const eventListener = new EventListener();
    const button = document.getElementById("deleteAllDoneTask");

    if (!button) return;
    eventListener.add("sample", "click", button, () => alert("clicked"));
    // add()を呼び出した直後にremove()を呼び出しているのでalertダイアログは表示されなくなる
    eventListener.remove("sample");
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
