type Subscription<T> = (input: T) => void;

class Observer<T> {
  private subscriptions: Subscription<T>[] = [];

  constructor(_value?: T) {}

  subscribe(subscription: Subscription<T>): number {
    this.subscriptions = [...this.subscriptions, subscription];
    return this.subscriptions.length - 1;
  }

  unsubcribe(subscriptionId: number): void {
    this.subscriptions = this.subscriptions.filter((subscription, index) => {
      return index !== subscriptionId;
    });
  }

  next(value: T) {
    for (const subscription of this.subscriptions) {
      subscription(value);
    }
  }
}

const observed = [1, 2];
const observer = new Observer(observed);
observer.subscribe((value) => console.log(value[0] + value[1]));
observer.next(observed);
observed[0] = 10;
observer.next(observed);
