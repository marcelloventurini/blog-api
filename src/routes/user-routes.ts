import express from "express"
import UserController from "../controllers/user-controller"

const router = express.Router()

router.get("/users", UserController.getUsers)
router.get("/users/:id", UserController.getUserById)
router.post("/users", UserController.createUser)
router.put("/users/:id", UserController.updateUser)
router.delete("/users/:id", UserController.deleteUser)

export default router
