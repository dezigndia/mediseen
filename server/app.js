const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")

const mongooseConnect = require("./utils/mongooseConnect")
const errorController = require("./controllers/errorController")

const exampleRoute = require("./routes/exampleRoute")

dotenv.config()

const app = express()

// mongooseConnect(process.env.MONGO_URI, process.env.MODE)

if (process.env.MODE === "DEVELOPMENT") {
	app.use(morgan("dev"))
	app.use(cors())
}
app.use(express.json())

app.use("/api/example", exampleRoute)

app.use(errorController)

const PORT = process.env.PORT || 5000

// const dirname = path.resolve()

// if (process.env.NODE_ENV === "PRODUCTION") {
// 	app.use(express.static(path.join(dirname, "/frontend/build")))
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// 	})
// }

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))
