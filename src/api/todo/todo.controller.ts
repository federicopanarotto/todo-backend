import { Response, NextFunction } from "express";
import { TypedRequest } from '../../utils/typed-request.interface';
import { AddTodoDTO, QueryTodoDTO } from "./todo.dto";
import { Todo } from "./todo.entity";
import { addTodo, checkTodo, findTodos } from "./todo.service";
import { NotFoundError } from "../../errors/not-found.error";

export const list = async (
  req: TypedRequest<unknown, QueryTodoDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos: Todo[] = await findTodos(req.query);

    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
}

export const add = async (
  req: TypedRequest<AddTodoDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, dueDate } = req.body;

    const added = await addTodo({
        title: title,
        dueDate: dueDate,
        completed: false
      });

    res.status(201).json(added);
  } catch (err) {
    next(err);
  }
}

export const check = (check: boolean) => {
  return async (
    req: TypedRequest<unknown, unknown, {id: string}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
  
      const patchedTodo = await checkTodo(id, check);
      if (!patchedTodo) {
        throw new NotFoundError();
      }
  
      res.status(200).json(patchedTodo);
    } catch (err) {
      next(err);
    }
  }
}