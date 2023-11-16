import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import mongoose from "mongoose"

const validateIdFormat = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid ID format." })
    return
  }

  next()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _, res, _next) => {
  res.status(500).json({ message: "Internal server error.", error: err.message })
}

export { validateIdFormat, errorHandler }
