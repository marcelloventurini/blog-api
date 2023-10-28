import express from "express"

const app = express()
const port = 3000

app.get("/", (_, res) => {
  res.status(200).send("I'm alive!")
})

app.listen(port, () => {
  console.log(`Server listen on port ${port}`)
})
