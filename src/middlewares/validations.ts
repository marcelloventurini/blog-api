import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"

const validateIdFormat = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid ID format." })
    return
  }

  next()
}

export { validateIdFormat }
