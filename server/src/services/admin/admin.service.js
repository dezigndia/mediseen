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

function exactMatch(val) {
    if (val === "businessType") return true
    return false
}

function getConditions(req) {
    let conditions = {}

    let body = req.query

    Object.keys(body).forEach(each => {
        if (each === "skip" || each === "limit") return
        else if (each.indexOf("MIN_PRICE") >= 0) {
            //send in payload:{sellingPrice_MIN_PRICE}
            console.log(each.slice(0, each.length - 10))
            if (!conditions[each.slice(0, each.length - 10)])
                conditions[each.slice(0, each.length - 10)] = {}
            conditions[each.slice(0, each.length - 10)]["$gte"] = body[each] - "0"
            return
        } else if (each.indexOf("MAX_PRICE") >= 0) {
            if (!conditions[each.slice(0, each.length - 10)])
                conditions[each.slice(0, each.length - 10)] = {}
            conditions[each.slice(0, each.length - 10)]["$lte"] = body[each] - "0"
            return
        }

        let reqEx = exactMatch(each) ? "^" + body[each] + "$" : new RegExp(body[each], "i")
        conditions[each] = { $regex: reqEx }
    })

    // Movie.find({ year: { $gte: 1980, $lte: 1989 } })

    console.log(conditions)

    return conditions
}

module.exports = {
    getConditions,
}
