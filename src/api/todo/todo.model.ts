import { model, Schema } from "mongoose";
import { Todo } from "./todo.entity";

const todoSchema = new Schema<Todo>({
  title: String,
  dueDate: Date,
  completed: Boolean,
});

todoSchema.virtual('expired').get(function() {
  const now = new Date();
  return this.dueDate < now;
});

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    return {
      id: ret.id,
      title: ret.title,
      dueDate: ret.dueDate,
      completed: ret.completed,
      expired: ret.expired,
    };
  }
});

export const TodoModel = model<Todo>('Todo', todoSchema);