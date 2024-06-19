import { Status, Task } from "./Task";

export class TaskCollection {
  private tasks: Task[] = [];

  add(task: Task) {
    this.tasks.push(task);
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
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
}
