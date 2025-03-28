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

export type QueryTodo = QueryTodoDTO;

export class AddTodoDTO {
  @IsString()
  title: string;
  
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;
}

export type AddTodo = AddTodoDTO;