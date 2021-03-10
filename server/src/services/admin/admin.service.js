const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../../models/UserModel")
const Admin = require("../../models/AdminModel")

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

async function getSortingConditions(req) {
    let { sortBy, asc } = req.query
    let ans = {}
    ans[sortBy] = asc

    return ans
}

async function getAdminFromToken(req) {
    const header = req.headers["authorization"]
    if (!header) {
        return null
    }
    const token = header
    if (!token) {
        return null
    }

    const { id } = jwt.verify(token, config.has("jwt.secret") ? config.get("jwt.secret") : null, {
        expiresIn: "1h",
    })
    let user = await Admin.findById(id)
    user.password = null
    return user
}

module.exports = {
    getConditions,
    getAdminFromToken,
    getSortingConditions,
}
