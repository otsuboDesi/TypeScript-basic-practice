import { Status, Task, TaskObject } from "./Task";

const STORAGE_KEY = "TASKS";

export class TaskCollection {
  private readonly storage;
  private tasks;

  constructor() {
    this.storage = localStorage;
    console.log(this.storage);
    this.tasks = this.getStoredTasks();
  }

  add(task: Task) {
    this.tasks.push(task);
    this.updateStorage();
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
    this.updateStorage();
  }

  // Domから取得したidを使って、該当のTaskインスタンスを見つけ出す
  find(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(task: Task) {
    // mapを使ってidが一致するタスクを置き換えている
    this.tasks = this.tasks.map((item) => {
      if (item.id === task.id) return task;
      return item;
    });
  }

  filter(filterStatus: Status) {
    return this.tasks.filter(({ status }) => status === filterStatus);
  }

  // 対象となるタスクをターゲットとなるタスクの前に移動させるメソッド
  moveAboveTarget(task: Task, target: Task) {
    const taskIndex = this.tasks.indexOf(task);
    const targetIndex = this.tasks.indexOf(target);

    this.changeOrder(
      task,
      taskIndex,
      taskIndex < targetIndex ? targetIndex - 1 : targetIndex
    );
  }

  // タスクを最後に移動させるメソッド
  moveToLast(task: Task) {
    const taskIndex = this.tasks.indexOf(task);

    this.changeOrder(task, taskIndex, this.tasks.length);
  }

  // タスクの並びを変更するメソッド
  private changeOrder(task: Task, taskIndex: number, targetIndex: number) {
    this.tasks.splice(taskIndex, 1);
    this.tasks.splice(targetIndex, 0, task);
    this.updateStorage();
  }

  private updateStorage() {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  private getStoredTasks() {
    const jsonString = this.storage.getItem(STORAGE_KEY);

    if (!jsonString) return [];

    // JSON.parseで渡した文字列によっては、変換してエラーが発生してしまう可能性もあるのでtryでエラーをキャッチする
    try {
      // JSON.parse: 配列に変換 しかし、anyを返すメソッド
      const storedTasks = JSON.parse(jsonString);

      assertIsTaskObjects(storedTasks);
      const tasks = storedTasks.map((task) => new Task(task));

      console.log(tasks);
      return tasks;
    } catch {
      // errorになったらその値をlocalStorageを使って削除する
      this.storage.removeItem(STORAGE_KEY);
      return [];
    }
  }
}

function assertIsTaskObjects(value: any): asserts value is TaskObject[] {
  if (!Array.isArray(value) || !value.every((item) => Task.validate(item))) {
    throw new Error("引数「value」は TaskObject[] 型と一致しません。");
  }
}
