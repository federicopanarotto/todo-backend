import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class QueryTodoDTO {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value.toLowerCase() === 'true' ? true : (value.toLowerCase() === 'false' ? false : value); 
  })
  showCompleted?: boolean;
}

export class AddTodoDTO {
  @IsString()
  title: string;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;
}

export type QueryTodo = QueryTodoDTO;