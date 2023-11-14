import mongoose, { Document, Schema } from "mongoose"
import { IUser } from "./user"

export interface IPost extends Document {
  title: string
  content: string
  publicationDate: Date
  author: IUser["_id"]
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  publicationDate: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

export default mongoose.model<IPost>("Post", postSchema)
