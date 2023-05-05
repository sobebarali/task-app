import { Response, Request } from "express";
import { ITodo } from "../types/task";
import Todo from "../models/task";
import { verifyAndExtractUserId } from "../helpers/verifyAndExtractUserId";

const addTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { authorization } = req.headers;
    const token: string = authorization?.split(" ")[1]!;

    const userId = verifyAndExtractUserId(token);

    const info = req.body;

    const todo: ITodo = new Todo({
      userId,
      title: info.title,
    });

    const newTodo: ITodo = await todo.save();

    return res.status(201).send({
      data: {
        success: true,
        todo: newTodo,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error While adding a task",
    });
  }
};

const getTodos = async (req: Request, res: Response): Promise<any> => {
  try {
    const { authorization } = req.headers;
    const token: string = authorization?.split(" ")[1]!;
    const userId = verifyAndExtractUserId(token);

    const todos: ITodo[] = await Todo.find({ userId });
    res.status(200).send({ todos });
  } catch (error) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error While getting all the tasks",
    });
  }
};

const updateTodoDone = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const { authorization } = req.headers;
    const token: string = authorization?.split(" ")[1]!;
    const userId = verifyAndExtractUserId(token);

    const updateTodo: ITodo | null = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { status: true },
      { new: true }
    );

    res.status(200).json({ message: "Todo updated", todo: updateTodo });
  } catch (error) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error While updating a task to done",
    });
  }
};

const updateTodoNotDone = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const { authorization } = req.headers;
    const token: string = authorization?.split(" ")[1]!;
    const userId = verifyAndExtractUserId(token);

    const updateTodo: ITodo | null = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { status: false },
      { new: true }
    );

    res.status(200).json({ message: "Todo updated", todo: updateTodo });
  } catch (error) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error While updating a task undone",
    });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { authorization } = req.headers;
    const token: string = authorization?.split(" ")[1]!;
    const userId = verifyAndExtractUserId(token);

    const deletedTodo: ITodo | null = await Todo.findOneAndRemove({
      _id: req.params.id,
      userId,
    });

    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
    });
  } catch (error) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error While deleting a task",
    });
  }
};

const getTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { authorization } = req.headers;
    const token: string = authorization?.split(" ")[1]!;
    const userId = verifyAndExtractUserId(token);

    const info = await Todo.findOne({ _id: req.params.id, userId });

    if(!info) return res.status(404).json({message: "Todo not found"});

    res.status(200).json(info);
  } catch (error) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error While getting a task",
    });
  }
};

export {
  getTodos,
  addTodo,
  updateTodoDone,
  updateTodoNotDone,
  deleteTodo,
  getTodo,
};
