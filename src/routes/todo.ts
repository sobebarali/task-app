import { Router } from "express"
import { getTodos, addTodo, updateTodoDone,updateTodoNotDone, deleteTodo} from '../controllers/todo'

const router: Router = Router()

router.post("/todo-item/list", getTodos)
router.post("/todo-item/create", addTodo)
router.post("/todo-item/mark-as-done/:id", updateTodoDone)
router.post("/todo-item/mark-as-not-done/:id", updateTodoNotDone)
// router.post("/todo-item/move-to-directory/:id", moveToDirectory)
router.post("/todo-item/:id", deleteTodo)



export default router