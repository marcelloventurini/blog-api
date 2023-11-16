import express from "express"
import PostController from "../controllers/post-controller"
import { validateIdFormat } from "../middlewares/validations"
import { paginateAndQuery } from "../middlewares/pagination"

const router = express.Router()

router.get("/posts", PostController.getPosts, paginateAndQuery)
router.get("/posts/search", PostController.search, paginateAndQuery)
router.get("/posts/:id", validateIdFormat, PostController.getPostById)
router.post("/posts", PostController.createPost)
router.put("/posts/:id", validateIdFormat, PostController.updatePost)
router.delete("/posts/:id", validateIdFormat, PostController.deletePost)

export default router
