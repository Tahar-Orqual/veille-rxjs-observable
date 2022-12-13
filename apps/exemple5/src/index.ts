import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

const observable = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
observable
  .pipe(
    catchError((err) => {
      console.error('something wrong occurred: ' + err);
      return of(undefined);
    }),
    finalize(() => {
      console.log('done');
    }),
  )
  .subscribe((value?: number) => {
    if (value) console.log('got value ' + value);
  });
console.log('just after subscribe');
