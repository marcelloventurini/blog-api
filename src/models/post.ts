import mongoose, { Document, Schema } from "mongoose"
import { IUser } from "./user"

export interface IPost extends Document {
  title: string
  content: string
  publicationDate: Date
  author: IUser["_id"]
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publicationDate: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

export default mongoose.model<IPost>("Post", postSchema)
