import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  fullName: string
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  fullName: { type: String, required: true, trim: true }
})

export default mongoose.model<IUser>("User", userSchema)
