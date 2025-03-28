import { Router } from "express";
import { add, check, list } from "./todo.controller";
import { validateFn } from "../../utils/validation.middleware";
import { AddTodoDTO, QueryTodoDTO } from "./todo.dto";

const router = Router();

router.get('/', validateFn(QueryTodoDTO, 'query'), list);
router.post('/', validateFn(AddTodoDTO), add);
router.patch('/:id/check', check(true));
router.patch('/:id/uncheck', check(false));

export default router;