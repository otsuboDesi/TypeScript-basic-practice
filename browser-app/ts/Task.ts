import { v4 as uuid, validate } from "uuid";

export const statusMap = {
  todo: "TODO",
  doing: "DOING",
  done: "DONE",
  //   as constで型アサーションを行うので、"TODO"型、"DOING"型、 "DONE"型になる
} as const;

// keyof: ユニオン型にする
// typeof: 変数の型を取り出すことができる
export type Status = (typeof statusMap)[keyof typeof statusMap];
// output: "TODO" | "DOING" | "DONE"

export type TaskObject = {
  id: string;
  title: string;
  status: Status;
};

export class Task {
  readonly id;
  title;
  status;

  constructor(properties: { id?: string; title: string; status?: Status }) {
    this.id = properties.id || uuid();
    this.title = properties.title;
    this.status = properties.status || statusMap.todo;
  }

  update(properties: { title?: string; status?: Status }) {
    this.title = properties.title || this.title;
    this.status = properties.status || this.status;
  }

  // Assertion Function
  // Taskクラスに渡された値がTaskのオブジェクトとして正しい形かどうか確認する静的メソッド
  static validate(value: any) {
    if (!value) return false;
    if (!validate(value.id)) return false;
    if (!value.title) return false;
    if (!Object.values(statusMap).includes(value.status)) return false;

    return true;
  }
}
