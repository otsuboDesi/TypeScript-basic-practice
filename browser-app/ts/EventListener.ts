import { v4 as uuid } from "uuid";
// Conditional Type:  Condition<T, U, X, Y> = T extends U ? X : Y
// -> TがUに代入可能であればXの形に、そうでなければYの形になるという事を表している。

// Tが'click'や'focus'などDOMのイベントとして定義されている値(keyof HTMLElementEventMap)だった時
type Handler<T> = T extends keyof HTMLElementEventMap
  ? (e: HTMLElementEventMap[T]) => void
  : // 条件に一致しない場合は汎用的なEventのオブジェクトを引数に持った関数を返す
    (e: Event) => void;

type Listeners = {
  [id: string]: {
    event: string;
    element: HTMLElement;
    handler: Handler<string>;
  };
};

export class EventListener {
  private readonly listeners: Listeners = {};

  //   引数として与えられたHTML要素に対して、任意のイベントを登録するためのメソッド
  add<T extends string>(
    event: T,
    element: HTMLElement,
    handler: Handler<T>,
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
