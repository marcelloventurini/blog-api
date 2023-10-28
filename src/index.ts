import express from "express"
import connectDB from "./config/db-connect"
import dotenv from "dotenv"
import users from "./routes/user-routes.js"

dotenv.config()

const app = express()
const port = 3000

const MONGO_URI: string = process.env.MONGO_URI as string
connectDB(MONGO_URI)

if (!MONGO_URI) {
  throw new Error("The MONGO_URI environment variable is not defined.")
}

app.get("/", (_, res) => {
  res.status(200).send("I'm alive!")
})

// usado para interpretar os corpos das solicitaçÕes recebidas como json
app.use(express.json())
app.use(express.json(), users)

app.listen(port, () => {
  console.log(`Server listen on port ${port}`)
})
