import { NextFunction, Request, Response } from "express"
import Post, { IPost } from "../models/post"

class PostController {
  static getPosts = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const posts = await Post.find()
      res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  }

  static getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const postById = await Post.findById(id)

      res.status(200).json(postById)
    } catch (error) {
      next(error)
    }
  }

  static createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postData: IPost = req.body
      const newPost = await Post.create(postData)

      res.status(201).json({ message: "Post created successfully.", newPost })
    } catch (error) {
      next(error)
    }
  }

  static updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const postData: IPost = req.body
      const updatedPost = await Post.findOneAndUpdate({ _id: id }, postData, { new: true, runValidators: true })

      res.status(200).json({ message: "Post updated successfully.", updatedPost })
    } catch (error) {
      next(error)
    }
  }

  static deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await Post.findByIdAndDelete(id)

      res.status(200).json({ message: "Post deleted successfully." })
    } catch (error) {
      next(error)
    }
  }

  static search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { search } = req.query

      if (!search) {
        res.status(404).json({ message: "The search parameter is missing or empty." })
        return
      }

      const posts = await Post.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } }
        ]
      })

      if (posts.length === 0) {
        res.status(404).json({ message: "Post not found." })
        return
      }

      res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  }
}

export default PostController
