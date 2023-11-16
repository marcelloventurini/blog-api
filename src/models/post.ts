import mongoose, { CallbackError, Document, Schema } from "mongoose"
import { IUser } from "./user"

export interface IPost extends Document {
  title: string
  content: string
  publicationDate: Date
  author: IUser["username"]
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  publicationDate: { type: Date, default: Date.now },
  author: { type: String, ref: "User.username", required: true }
})

postSchema.pre<IPost>("save", async function (next) {
  try {
    const user = await mongoose.model<IUser>("User").findOne({ username: this.author })

    if (!user) {
      throw new Error("User does not exist.")
    }

    next()
  } catch (error) {
    next(error as CallbackError)
  }
})

export default mongoose.model<IPost>("Post", postSchema)
