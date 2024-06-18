import dragula from "dragula";
import { Status, Task, statusMap } from "./Task";

export class TaskRender {
  constructor(
    private readonly todoList: HTMLElement,
    private readonly doingList: HTMLElement,
    private readonly doneList: HTMLElement
  ) {}

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

  subscribeDragAndDrop(
    onDrop: (el: Element, sibling: Element | null, newStatus: Status) => void
  ) {
    // .on(el,target,source)
    // el: 移動した要素自体が渡される
    // target: 移動した先の親要素が渡される
    // source: 移動する前に対象の要素が置かれていた親要素が渡される
    // sibling: 移動した要素の兄弟の要素が渡される
    dragula([this.todoList, this.doingList, this.doneList]).on(
      "drop",
      (el, target, _source, sibling) => {
        let newStatus: Status = statusMap.todo;

        if (target.id === "doingList") newStatus = statusMap.doing;
        if (target.id === "doneList") newStatus = statusMap.done;

        onDrop(el, sibling, newStatus);
        // console.log(el);
        // console.log(target);
        // console.log(source);
        // console.log(sibling);
      }
    );
  }

  getId(el: Element) {
    return el.id;
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
