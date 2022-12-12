abstract class Observer {
  /**
   * Name of the observable used for unregister 
   */
  name: string = ""

  /**
   * Notify is called any time there is a notification triggered by the Subject
   */
  notify(): void { /* Abstract method */  }
} 

class ConcreteObserverA implements Observer {
  name = "ConcreteObserverA"
  notify(): void {
    console.log(this.name);
  }
}

class ConcreteObserverB implements Observer {
  name = "ConcreteObserverB"
  notify(): void {
    console.log(this.name);
  }
}

class Subject {
  /**
   * Collection of class that implement Observer
   */
  observerCollection: Observer[] = []

  /**
   * Add an observer to the collection
   * @param observer A class that implement Observer
   */
  registerObserver(observer: Observer): void {
    this.observerCollection.push(observer)
  }

  /**
   * Remove an observer from the collection
   * @param observer A class that implement Observer
   */
  unRegisterObserver(observer: Observer): void {
    this.observerCollection = this.observerCollection.filter(
      (obs) => (JSON.stringify(obs) !== JSON.stringify(observer))
    )
  }

  /**
   * Trigger the notify() method of all observer of the collection
   */
  notifyObservers(): void {
    for (const observer of this.observerCollection) {
      observer.notify()
    }
  }
}

const observerA = new ConcreteObserverA()
const observerB = new ConcreteObserverB()
const subject = new Subject()

subject.registerObserver(observerA)
subject.registerObserver(observerB)

console.log("subject.notifyObservers()");
subject.notifyObservers()
subject.unRegisterObserver(observerA)
console.log("====");
console.log("subject.notifyObservers()");
subject.notifyObservers()
