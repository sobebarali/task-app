import { Response, Request } from "express"
import { ITodo } from "../types/todo"
import Todo from "../models/todo"
import Directory from "../models/directory"


const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTodos: ITodo[] = await Todo.find()
    res.status(201).send({ todos: allTodos })
  } catch (error) {
    throw error
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const info = req.body

    const todo: ITodo = new Todo({
      title: info.title,
      status: info.status,
    })

    const newTodo: ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find()
    res.status(201).json({ message: "Todo added", todo: newTodo, todos: allTodos })
  } catch (error) {
    throw error
  }
}


const updateTodoDone = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, { status: true })
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({ message: "Todo updated", todo: updateTodo, todos: allTodos, })
  } catch (error) {
    throw error
  }
}

const updateTodoNotDone = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, { status: false })
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({ message: "Todo updated", todo: updateTodo, todos: allTodos, })
  } catch (error) {
    throw error
  }
}

// const moveToDirectory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params

//     const documentsToMove = Todo.find({ _id: id });
//     const documentsData = {...documentsToMove};

//     const insertedInDirectory: any = Directory.insertOne(documentsData);
//     const deletedfromTodo: any = Todo.findByIdAndRemove(documentsToMove);

//     const allTodos: ITodo[] = await Todo.find()
//     res.status(200).json({ message: "Todo Move to Directory", todos: allTodos })
//   } catch (error) {
//     throw error
//   }
// }

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    )
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    })
  } catch (error) {
    throw error
  }
}


export { getTodos, addTodo, updateTodoDone, updateTodoNotDone, deleteTodo }