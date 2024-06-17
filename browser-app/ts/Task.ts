import { v4 as uuid } from "uuid";

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

export class Task {
  readonly id;
  title;
  status;

  constructor(properties: { title: string }) {
    this.id = uuid();
    this.title = properties.title;
    this.status = statusMap.todo;
  }
}
