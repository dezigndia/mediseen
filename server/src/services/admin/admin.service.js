// const Admin = require("../../models/AdminModel")
// const expressAsyncHandler = require("express-async-handler")

// class AdminService {
// register = expressAsyncHandler(async body => {
//     const { name, email, password } = body
//     return Admin.create({ name, email, password })
// })
// login = expressAsyncHandler(async (req, res) => {
//     const { email } = req.body.email
//     const admin = await Admin.findOne({ email })
//     if (!admin) {
//         return res.status(401).json({ message: "User not found" })
//     }
//     if (admin.password != req.body.password) {
//         return res.status(401).json({ message: "Auth Failed" })
//     }
//     return res.status(200).json({ message: "Admin found" })
// })
// }

// module.exports = AdminService

// function getConditions(req) {
//     let conditions = {
//         searchQuery : "aaa",

//     }
// }
