class Observer<T> {
  /**
   * Observed Value
   */
  observed: T

  /**
   * Create the Observer
   * @param observed the initial observed value
   */
  constructor(observed: T) {
    this.observed = observed
  }

  /**
   * Observe a new value
   * @param value the new observed value
   */
  next(value: T) {
    this.observed = value
  }

  /**
   * @returns the current value observed
   */
  notify(): T {
    return this.observed
  }
}

class Subject<Number> {
  /**
   * Collection of Observers
   */
  observers: Observer<number>[] = []

  /**
   * Add an observer to the collection
   * @param observer A class that implement Observer
   */
  subscribe(observer: Observer<number>): void {
    this.observers = [...this.observers, observer]
  }

  /**
   * Remove an observer from the collection
   * @param observer A class that implement Observer
   */
  unsubscribe(observer: Observer<number>): void {
    this.observers = this.observers.filter(
      (obs) => (JSON.stringify(obs) !== JSON.stringify(observer))
    )
  }

  /**
   * Compute all observed value
   */
  compute() {
    return this.observers.reduce((previousValue, currentObserver) => {
      return previousValue + currentObserver.notify()
    }, 0)
  }
}

const subject = new Subject()
const observerA = new Observer(1)
subject.subscribe(observerA)
const observerB = new Observer(1)
subject.subscribe(observerB)

console.log("first computation", subject.compute());
observerA.next(41)
console.log("second computation", subject.compute());
observerA.next(1)
observerB.next(364)
console.log("third computation", subject.compute());
observerA.next(64)
subject.unsubscribe(observerB)
console.log("forth computation", subject.compute());

