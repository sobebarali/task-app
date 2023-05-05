import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodoDone,
  updateTodoNotDone,
  deleteTodo,
  getTodo,
} from "../controllers/task";
import { isAuthenticated } from "../middleware/isAuthenticated";

const taskRouter: Router = Router();

taskRouter.get("/task/list", isAuthenticated, getTodos);
taskRouter.post("/task/create", isAuthenticated, addTodo);
taskRouter.patch("/task/mark-as-done/:id", isAuthenticated, updateTodoDone);
taskRouter.patch("/task/mark-as-not-done/:id", isAuthenticated, updateTodoNotDone);
taskRouter.delete("/task/:id", isAuthenticated, deleteTodo);
taskRouter.get("/task/get/:id", isAuthenticated, getTodo);

export default taskRouter;
