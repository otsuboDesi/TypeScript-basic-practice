import { v4 as uuid } from "uuid";

type Listeners = {
  [id: string]: {
    event: string;
    element: HTMLElement;
    handler: (e: Event) => void;
  };
};

export class EventListener {
  private readonly listeners: Listeners = {};

  //   引数として与えられたHTML要素に対して、任意のイベントを登録するためのメソッド
  add(
    event: string,
    element: HTMLElement,
    handler: (e: Event) => void,
    listenerId = uuid()
  ) {
    this.listeners[listenerId] = {
      event,
      element,
      handler,
    };

    element.addEventListener(event, handler);
  }

  //   登録したイベントの削除をする処理
  remove(listenerId: string) {
    const listener = this.listeners[listenerId];

    if (!listener) return;

    listener.element.removeEventListener(listener.event, listener.handler);

    // 見つけたオブジェクトをthis.listenersからも削除
    delete this.listeners[listenerId];
  }
}
