import { todos } from "./app/data/todos";

todos.list$.subscribe(console.log);

todos.set({
  title: "Learn RxJS Observable",
  description: "An RxJS Observable is cool!!!",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const uuid2 = todos.set({
  title: "Learn RxJS Subject",
  description: "An RxJS Subject is cool too!!!",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const uuid3 = todos.set({
  title: "Learn RxJS operators",
  description: "An RxJS Operators can do a lot of cool stufs",
  createdAt: new Date(),
  updatedAt: new Date(),
});

if (uuid3 !== undefined)
  todos.set(uuid3, {
    description: "An RxJS Operators can do a lot of cool stufs!!!",
    updatedAt: new Date(),
  });

if (uuid2 !== undefined) todos.unset(uuid2);
