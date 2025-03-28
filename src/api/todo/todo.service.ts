import { QueryTodo } from "./todo.dto";
import { Todo } from "./todo.entity";
import { TodoModel } from "./todo.model";

export async function findTodos(query: Partial<QueryTodo>): Promise<Todo[]> {
  const q: any = {};

  if (query.showCompleted === undefined || query.showCompleted === false) {
    q.completed = false;
  }

  return await TodoModel.find(q);
} 

export async function addTodo(todo: Todo): Promise<Todo> {
  return await TodoModel.create(todo);
}

export async function checkTodo(todoId: string, check: boolean): Promise<Todo | null> {
  const todo = await TodoModel.findByIdAndUpdate(todoId, { completed: check }, { new: true });
  console.log(todo);
  return todo;
}
