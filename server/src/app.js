const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const helmet = require("helmet")
const config = require("config")
const mongooseConnect = require("./utils/mongooseConnect")
const errorController = require("./controllers/errorController")
const indexRoute = require("./routes/index.route")

dotenv.config()
const app = express()
mongooseConnect(config.has("database.URL") ? config.get("database.URL") : null)

// Intialize morgan if dev environment
if (process.env.NODE_ENV == "dev") {
    app.use(morgan("dev"))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50md" }))
app.use(cors())
app.use(helmet())

app.use("/api", indexRoute)

app.use(errorController)

module.exports = app
