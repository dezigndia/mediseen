const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../../models/UserModel")
const Admin = require("../../models/AdminModel")
const { StatusCodes } = require("http-status-codes")

function exactMatch(val) {
    if (val === "businessType") return true
    return false
}

function getConditions(req) {
    let conditions = {}

    let body = req.query

    Object.keys(body).forEach(each => {
        if (each === "skip" || each === "limit" || each === "sortBy" || each === "asc") return
        else if (each.indexOf("MIN_PRICE") >= 0) {
            //send in payload:{sellingPrice_MIN_PRICE}
            // console.log(each.slice(0, each.length - 10))
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

    console.log(conditions, "conditions")

    return conditions
}

async function getSortingConditions(req) {
    let { sortBy, asc } = req.query
    if (sortBy && asc) {
        // console.log(sortBy, asc)
        let ans = {}
        ans[sortBy] = parseInt(asc)
        console.log(ans, "sort cond")
        return ans
    }

    return ""
}

async function getAdminFromToken(req, res) {
    try {
        const header = req.headers["authorization"]
        if (!header) {
            return null
        }
        const token = header
        if (!token) {
            return null
        }

        const data = jwt.verify(token, config.has("jwt.secret") ? config.get("jwt.secret") : null, {
            expiresIn: "24h",
        })
        // const { id } = data
        let user = await Admin.findById(data.id)
        user.password = null
        return user
    } catch (e) {
        res.status(StatusCodes.REQUEST_TIMEOUT).json({ messgae: "Login Again!" })
    }
}

module.exports = {
    getConditions,
    getAdminFromToken,
    getSortingConditions,
}
