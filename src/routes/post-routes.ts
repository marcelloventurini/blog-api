import express from "express"
import PostController from "../controllers/post-controller"

const router = express.Router()

router.get("/posts", PostController.getPosts)

export default router
