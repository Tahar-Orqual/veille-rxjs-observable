import List from "../utils/list/list";

interface Todo {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const todos = new List<Todo>();
