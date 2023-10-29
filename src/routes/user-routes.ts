import express from "express"
import UserController from "../controllers/user-controller"
import { validateIdFormat } from "../middlewares/validations"

const router = express.Router()

router.get("/users", UserController.getUsers)
router.get("/users/:id", validateIdFormat, UserController.getUserById)
router.post("/users", UserController.createUser)
router.put("/users/:id", validateIdFormat, UserController.updateUser)
router.delete("/users/:id", validateIdFormat, UserController.deleteUser)

export default router
