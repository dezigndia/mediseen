const app = require("./app")
const config = require("config")

const PORT = config.has("database.app.port") ? config.get("database.app.port") : 5000
app.listen(PORT, () => {
  console.log("MODE:", process.env.NODE_ENV)
  console.log(`Server running on port ${PORT}.`)
})
