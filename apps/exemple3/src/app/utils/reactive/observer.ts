type Subscription<T> = (input: T) => void;

export default class Observer<T> {
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
