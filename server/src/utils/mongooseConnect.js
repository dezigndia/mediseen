const mongoose = require("mongoose")
const autoIncrement = require("mongoose-auto-increment")
module.exports = uri => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(conn => {
            autoIncrement.initialize(conn)
            console.log("Connected To Database.")
        })
        .catch(err => {
            console.log("Error connecting to Database", err)
        })
}
