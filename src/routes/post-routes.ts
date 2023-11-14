import express from "express"
import PostController from "../controllers/post-controller"
import { validateIdFormat } from "../middlewares/validations"

const router = express.Router()

router.get("/posts", PostController.getPosts)
router.get("/posts/search", PostController.search)
router.get("/posts/:id", validateIdFormat, PostController.getPostById)
router.post("/posts", PostController.createPost)
router.put("/posts/:id", validateIdFormat, PostController.updatePost)
router.delete("/posts/:id", validateIdFormat, PostController.deletePost)

export default router
