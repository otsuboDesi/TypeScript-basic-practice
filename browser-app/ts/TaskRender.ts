import { Task } from "./Task";

export class TaskRender {
  constructor(private readonly todoList: HTMLElement) {}

  append(task: Task) {
    const { taskEl, deleteButtonEl } = this.render(task);

    this.todoList.append(taskEl);

    // append()で受け取ったdeletButtonElをそのまま返す
    return { deleteButtonEl };
  }

  remove(task: Task) {
    const taskEl = document.getElementById(task.id);

    if (!taskEl) return;

    // removeChild: DOM API
    // DOM APIでは指定したHTML要素を直接削除するようなAPIではなく、削除したい要素の親要素のremoveChildを使って要素を削除する
    this.todoList.removeChild(taskEl);
  }
  private render(task: Task) {
    // <div class'taskItem'>
    // <span>タイトル</span>
    // <button>削除</button>
    // </div>

    const taskEl = document.createElement("div");
    const spanEl = document.createElement("span");
    const deleteButtonEl = document.createElement("button");

    taskEl.id = task.id;
    taskEl.classList.add("task-item");

    spanEl.textContent = task.title;
    deleteButtonEl.textContent = "削除";

    taskEl.append(spanEl, deleteButtonEl);

    return { taskEl, deleteButtonEl };
  }
}
