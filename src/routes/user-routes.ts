import express from "express"
import UserController from "../controllers/user-controller"
import { validateIdFormat } from "../middlewares/validations"
import { paginateAndQuery } from "../middlewares/pagination"

const router = express.Router()

router.get("/users", paginateAndQuery, UserController.getUsers)
router.get("/users/search", paginateAndQuery, UserController.search)
router.get("/users/:id", validateIdFormat, UserController.getUserById)
router.post("/users", UserController.createUser)
router.put("/users/:id", validateIdFormat, UserController.updateUser)
router.delete("/users/:id", validateIdFormat, UserController.deleteUser)

export default router
