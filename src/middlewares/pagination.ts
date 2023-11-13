import { NextFunction, Request, Response } from "express"
import User from "../models/user"

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

const paginateAndQuery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      res.status(400).json({ message: "Invalid 'order' parameter." })
      return
    }

    const sortOptions: { [key: string]: -1 | 1 } = {
      [sortBy]: order === Order.DESC ? -1 : 1
    }

    const users = await User.find()
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))

    req.result = {
      users,
      page,
      limit,
      sortBy,
      order
    }

    next()
  } catch (error) {
    next(error)
  }
}

export { paginateAndQuery, Order }
