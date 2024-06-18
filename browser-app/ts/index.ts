import { EventListener } from "./EventListener";
import { Task } from "./Task";
import { TaskCollection } from "./TaskCollection";
import { TaskRender } from "./TaskRender";

class Application {
  private readonly eventListener = new EventListener();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRender = new TaskRender(
    document.getElementById("todoList") as HTMLElement
  );

  start() {
    const createForm = document.getElementById("createForm") as HTMLElement;

    this.eventListener.add(
      "submit-handler",
      "submit",
      createForm,
      this.handleSubmit
    );
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();

    const titleInput = document.getElementById("title") as HTMLInputElement;
    if (!titleInput.value) return;

    const task = new Task({ title: titleInput.value });
    this.taskCollection.add(task);

    // Taskのインスタンスをappend()に渡して画面にタスクを表示させる
    const { deleteButtonEl } = this.taskRender.append(task);

    this.eventListener.add(task.id, "click", deleteButtonEl, () =>
      this.handleClickDeleteTask(task)
    );
    //valueを空文字に代入して、画面の入力フォームの文字を空にしている
    titleInput.value = "";
  };

  private handleClickDeleteTask = (task: Task) => {
    if (!window.confirm(`「${task.title}」を削除してよろしいですか？`)) return;

    // 削除ボタンクリックのイベントハンドラをEventListenerから削除する
    this.eventListener.remove(task.id);
    this.taskCollection.delete(task);
    this.taskRender.remove(task);
    console.log(this.taskCollection);
  };
}

// windowsのloadイベントのハンドラでApplicationクラスのインスタンスを作成
// loadはローディング工程がすべて終わった後に呼ばれるイベント
// loadが呼ばれた時点で、HTMLは全てDOMとして取得でき、画像などのassetsのロードも完了している
window.addEventListener("load", () => {
  const app = new Application();
  // start()を実行する
  app.start();
});
