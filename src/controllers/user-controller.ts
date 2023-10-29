import { Request, Response } from "express"
import User, { IUser } from "../models/user.js"

class UserController {
  static getUsers = async (_: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: "Failed to get users.", error })
    }
  }

  static getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: "Failed to get user.", error })
    }
  }

  static createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: IUser = req.body
      const newUser = await User.create(userData)

      res.status(201).json({ message: "User created successfully.", newUser })
    } catch (error) {
      res.status(500).json({ message: "Failed to create user.", error })
    }
  }

  static updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const userData: IUser = req.body
      const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true })

      res.status(200).json({ message: "User updated successfully.", updatedUser })
    } catch (error) {
      res.status(500).json({ message: "Failed to update user.", error })
    }
  }

  static deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await User.findByIdAndDelete(id)

      res.status(200).json({ message: "User deleted successfully." })
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user." })
    }
  }
}

export default UserController
