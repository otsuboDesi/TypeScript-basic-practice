import { EventListener } from "./EventListener";
import { Status, Task, statusMap } from "./Task";
import { TaskCollection } from "./TaskCollection";
import { TaskRender } from "./TaskRender";

class Application {
  private readonly eventListener = new EventListener();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRenderer = new TaskRender(
    document.getElementById("todoList") as HTMLElement,
    document.getElementById("doingList") as HTMLElement,
    document.getElementById("doneList") as HTMLElement
  );

  start() {
    const taskItems = this.taskRenderer.renderAll(this.taskCollection);
    const createForm = document.getElementById("createForm") as HTMLElement;
    const deleteAllDoneTaskButton = document.getElementById(
      "deleteAllDoneTask"
    ) as HTMLElement;

    taskItems.forEach(({ task, deleteButtonEl }) => {
      this.eventListener.add(
        "click",
        deleteButtonEl,
        () => this.handleClickDeleteTask(task),
        task.id
      );
    });

    this.eventListener.add("submit", createForm, this.handleSubmit);
    this.eventListener.add(
      "click",
      deleteAllDoneTaskButton,
      this.handleClickDeleteAllDoneTasks
    );

    this.taskRenderer.subscribeDragAndDrop(this.handleDropAndDrop);
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();

    const titleInput = document.getElementById("title") as HTMLInputElement;
    if (!titleInput.value) return;

    const task = new Task({ title: titleInput.value });
    this.taskCollection.add(task);

    // Taskのインスタンスをappend()に渡して画面にタスクを表示させる
    const { deleteButtonEl } = this.taskRenderer.append(task);

    this.eventListener.add(
      "click",
      deleteButtonEl,
      () => this.handleClickDeleteTask(task),
      task.id
    );
    //valueを空文字に代入して、画面の入力フォームの文字を空にしている
    titleInput.value = "";
  };

  // 指定した複数のタスクの削除
  private executeDeleteTask = (task: Task) => {
    this.eventListener.remove(task.id);
    this.taskCollection.delete(task);
    this.taskRenderer.remove(task);
  };

  private handleClickDeleteTask = (task: Task) => {
    if (!window.confirm(`「${task.title}」を削除してよろしいですか？`)) return;

    // 削除ボタンクリックのイベントハンドラをEventListenerから削除する
    this.executeDeleteTask(task);
    console.log(this.taskCollection);
  };

  private handleClickDeleteAllDoneTasks = () => {
    if (!window.confirm("DONEのタスクを一括削除してよろしいですか？")) return;

    // Doneの状態になっているタスクの一覧を取得
    const doneTasks = this.taskCollection.filter(statusMap.done);
    console.log(doneTasks);

    //抽出したdoneTasksに対してforEachでループさせて呼び出し、複数タスク一括削除の処理をする
    doneTasks.forEach((task) => this.executeDeleteTask(task));
  };

  private handleDropAndDrop = (
    el: Element,
    sibling: Element | null,
    newStatus: Status
  ) => {
    const taskId = this.taskRenderer.getId(el);

    if (!taskId) return;

    const task = this.taskCollection.find(taskId);
    console.log("taskId:", taskId);
    console.log("sibling:", sibling);
    console.log("newStatus:", newStatus);

    if (!task) return;
    // 更新されたタスクを使ってtasksを更新する
    task.update({ status: newStatus });
    this.taskCollection.update(task);

    if (sibling) {
      const nextTaskId = this.taskRenderer.getId(sibling);
      console.log(sibling);

      if (!nextTaskId) return;

      const nextTask = this.taskCollection.find(nextTaskId);

      if (!nextTask) return;
      this.taskCollection.moveAboveTarget(task, nextTask);
    } else {
      // siblingが存在しない場合は、対象となるタスクをリストの最後に移動させる
      this.taskCollection.moveToLast(task);
    }
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
