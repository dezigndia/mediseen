const mongoose = require("mongoose")

module.exports = (uri, mode) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Connected To Database.")
    })
    .catch(err => {
      console.log("Error connecting to Database", err)
    })
}
