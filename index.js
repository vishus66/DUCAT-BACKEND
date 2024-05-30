const express = require("express")
const cors = require("cors")
require("dotenv").config()

require("./db-connect")

const Router = require("./routes/RootRouter")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use("/public", express.static("public"))
app.use("/api", Router)


app.listen(8000, () => console.log("Server is Running at http://localhost:8000"))