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
    listenerId: string,
    event: string,
    element: HTMLElement,
    handler: (e: Event) => void
  ) {
    this.listeners[listenerId] = {
      event,
      element,
      handler,
    };

    element.addEventListener(event, handler);
  }
}
