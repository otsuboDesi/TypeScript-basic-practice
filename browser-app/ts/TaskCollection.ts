import { Status, Task } from "./Task";

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

  private updateStorage() {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  private getStoredTasks() {
    const jsonString = this.storage.getItem(STORAGE_KEY);

    if (!jsonString) return [];

    // JSON.parseで渡した文字列によっては、変換してエラーが発生してしまう可能性もあるのでtryでエラーをキャッチする
    try {
      // JSON.parse: 配列に変換 しかし、anyを返すメソッド
      const storedTasks: any[] = JSON.parse(jsonString);
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
