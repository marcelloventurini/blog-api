import { NextFunction, Request, Response } from "express"
import Post from "../models/post"

class PostController {
  static getPosts = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await Post.find()
      res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  }
}

export default PostController
