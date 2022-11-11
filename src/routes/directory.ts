import { Router } from "express"
import { listDirectory, createDirectory,  deleteDirectory } from '../controllers/directory'

const router: Router = Router()

router.post("/directory/list", listDirectory)
router.post("/directory/create", createDirectory)
router.post("/directory/remove/:id", deleteDirectory)

export default router