import { Request, Response } from "express"
// import mongoose from "mongoose"
import User from "../models/user.js"

class UserController {
  static async getUsers(_: Request, res: Response) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: "Failed to get users.", error })
    }
  }
}

export default UserController
