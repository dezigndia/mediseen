const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const status = require("http-status-codes")
const helmet = require("helmet")
const jwt = require("jsonwebtoken")

dotenv.config()

const mongooseConnect = require("./utils/mongooseConnect")
const errorController = require("./controllers/errorController")

const exampleRoute = require("./routes/exampleRoute")

const app = express()
const corsOptions = {
	allowedHeaders: [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"X-Access-Token",
	],
	methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
	origin: "*",
	preflightContinue: false,
}

mongooseConnect(process.env.MONGO_URI, process.env.MODE)
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50md" }))
app.use(cors(corsOptions))
app.use(helmet())

app.use("/api", exampleRoute)
app.use(errorController)
module.exports = app
