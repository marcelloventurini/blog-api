import { NextFunction, Request, Response } from "express"
import User, { IUser } from "../models/user.js"

enum Order {
  ASC = "asc",
  DESC = "desc"
}

interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  order?: Order
}

class UserController {
  static getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 3, sortBy = "_id", order = Order.DESC }: PaginationParams = req.query

      if (page <= 0 || limit <= 0) {
        res.status(400).json({ message: "Invalid format for limit or page." })
        return
      }

      if (!["_id", "username", "email", "fullName"].includes(sortBy)) {
        res.status(400).json({ message: "Invalid 'sortBy' parameter." })
        return
      }

      if (order !== Order.ASC && order !== Order.DESC) {
        res.status(400).json({ message: "erro" })
        return
      }

      const sortOptions: { [key: string]: -1 | 1 } = {
        [sortBy]: order === Order.DESC ? -1 : 1
      }

      const users = await User.find()
        .sort(sortOptions)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      if (!user) {
        res.status(404).json({ message: "User not found." })
        return
      }

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IUser = req.body
      const newUser = await User.create(userData)

      res.status(201).json({ message: "User created successfully.", newUser })
    } catch (error) {
      next(error)
    }
  }

  static updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userData: IUser = req.body
      const updatedUser = await User.findOneAndUpdate({ _id: id }, userData, { new: true, runValidators: true })

      if (!updatedUser) {
        res.status(404).json({ message: "User not found." })
        return
      }

      res.status(200).json({ message: "User updated successfully.", updatedUser })
    } catch (error) {
      next(error)
    }
  }

  static deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const deletedUser = await User.findByIdAndDelete(id)

      if (!deletedUser) {
        res.status(404).json({ message: "User not found." })
        return
      }

      res.status(200).json({ message: "User deleted successfully." })
    } catch (error) {
      next(error)
    }
  }

  static search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query

      if (!search) {
        res.status(400).json({ message: "The search parameter is missing or empty." })
        return
      }

      const users = await User.find({
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { fullName: { $regex: search, $options: "i" } }
        ]
      })

      if (users.length === 0) {
        res.status(404).json({ message: "No user found." })
        return
      }

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
