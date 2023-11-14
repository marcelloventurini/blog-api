import express from "express"
import PostController from "../controllers/post-controller"

const router = express.Router()

router.get("/posts", PostController.getPosts)
router.get("/posts/:id", PostController.getPostById)
router.post("/posts", PostController.createPost)
router.put("/posts/:id", PostController.updatePost)
router.delete("/posts/:id", PostController.deletePost)

export default router
