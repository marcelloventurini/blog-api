import mongoose from "mongoose"

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri)

    console.log("Connected to DB.")
  } catch (error) {
    console.log("Error connecting to DB.")
  }
}

export default connectDB
