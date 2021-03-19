const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../../models/UserModel")
const Admin = require("../../models/AdminModel")
const { StatusCodes } = require("http-status-codes")

function exactMatch(val) {
    console.log(val, val.toLowerCase().indexOf("phone") >= 0)
    if (val === "businessType" || val.toLowerCase().indexOf("phone") >= 0) return true
    return false
}

function getConditions(req) {
    let conditions = {}

    let body = req.query

    Object.keys(body).forEach(each => {
        if (each === "skip" || each === "limit" || each === "sortBy" || each === "asc") return
        else if (each.indexOf("_DATE_MIN") >= 0) {
            if (!conditions[each.slice(0, each.length - 9)])
                conditions[each.slice(0, each.length - 9)] = {}
            // console.log(body[each], each)
            let arrayDate = body[each].split("-")
            let dt = new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2])

            conditions[each.slice(0, each.length - 9)]["$gte"] = dt
        } else if (each.indexOf("_DATE_MAX") >= 0) {
            if (!conditions[each.slice(0, each.length - 9)])
                conditions[each.slice(0, each.length - 9)] = {}

            let arrayDate = body[each].split("-")
            let dt = new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2])

            conditions[each.slice(0, each.length - 9)]["$lte"] = dt
        } else if (each.indexOf("_MIN") >= 0) {
            //send in payload:{sellingPrice_MIN_PRICE}
            // console.log(each.slice(0, each.length - 10))
            if (!conditions[each.slice(0, each.length - 4)])
                conditions[each.slice(0, each.length - 4)] = {}
            conditions[each.slice(0, each.length - 4)]["$gte"] = body[each] - "0"
        } else if (each.indexOf("_MAX") >= 0) {
            if (!conditions[each.slice(0, each.length - 4)])
                conditions[each.slice(0, each.length - 4)] = {}
            conditions[each.slice(0, each.length - 4)]["$lte"] = body[each] - "0"
        } else if (each === "isActive") {
            conditions[each] = body[each]
        } else {
            try {
                let reqEx = "/^" + body[each] + "/i"
                conditions[each] = exactMatch(each)
                    ? body[each]
                    : { $regex: new RegExp(body[each], "i") }
            } catch (e) {
                console.log(e)
            }
        }
    })

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

function getFirstOfWeek(date) {
    let dateNew = new Date(date)
    var day = date.getDay() || 7
    if (day !== 1) dateNew.setHours(-24 * (day - 1))

    dateNew.setHours(0)
    dateNew.setMinutes(0)
    dateNew.setSeconds(0)
    dateNew.setMilliseconds(0)
    return dateNew
}

module.exports = {
    getConditions,
    getAdminFromToken,
    getSortingConditions,
    getFirstOfWeek,
}
