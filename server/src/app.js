const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const helmet = require("helmet")
var session = require("express-session")

dotenv.config()

const mongooseConnect = require("./utils/mongooseConnect")
const errorController = require("./controllers/errorController")
const indexRoute = require("./routes/index.route")

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
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50md" }))
app.use(cors(corsOptions))
app.use(helmet())

app.use(
	session({
		secret: "dezig",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
)

app.use("/api", indexRoute)

app.use(errorController)

module.exports = app
