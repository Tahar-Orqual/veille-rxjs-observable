import Observer from "../reactive/observer";

interface Listable<T> {
  uuid: string;
  body: T;
}

export default class List<T> {
  private list: Listable<T>[] = [];
  list$ = new Observer(this.list);

  private uuid() {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  set(input: T | string, partialBody?: Partial<T>): string | undefined {
    if (partialBody === undefined) {
      const uuid = this.uuid();
      this.list = [
        ...this.list,
        {
          uuid,
          body: input as T,
        },
      ];
      this.list$.next(this.list);
      return uuid;
    }
    const listableIndex = this.list.findIndex((value) => value.uuid === input);
    if (listableIndex < 0) return undefined;
    this.list[listableIndex] = {
      uuid: input as string,
      body: {
        ...this.list[listableIndex].body,
        ...partialBody,
      },
    };
    this.list$.next(this.list);
  }

  unset(input: string): T | undefined {
    let listable: Listable<T> | undefined;
    this.list = this.list.filter((value) => {
      if (value.uuid !== input) return true;
      listable = value;
      return false;
    });
    if (listable === undefined) return listable;
    this.list$.next(this.list);
    return listable.body;
  }

  get(input: string): T | undefined {
    return this.list.find((value) => value.uuid === input)?.body;
  }
}
