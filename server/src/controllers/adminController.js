const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10
const config = require("config")
const { isSuperAdmin } = require("../utils/adminHelper")
const { errorMessage, adminNotFound } = require("../utils/constants")
const { getConditions } = require("../services/admin/admin.service")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")
const Pathology = require("../models/PathologyModel")
const Hospital = require("../models/HospitalModel")
const Pharmarcy = require("../models/PharmacyModel")
const Doctor = require("../models/DoctorModel")
// const getConditions = require("../utils/adminHelper")
const addAdmin = expressAsyncHandler(async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    Admin.findOne({ email: email }).then(admin => {
        if (admin) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Already exists" })
        }
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
            const admin = new Admin({
                email,
                password: hashedPassword,
                name,
            })
            admin.save().then(admin => {
                res.json({ message: "saved successfully" })
            })
        })
    })
})

const removeAdmin = expressAsyncHandler(async (req, res) => {
    const { emails } = req.body
    console.log(req.body)
    let resReq
    emails.forEach(async email => {
        resReq = await Admin.deleteOne({ email: email, isSuperAdmin: false })
        if (!resReq.ok) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        }
    })

    console.log(resReq)
    res.status(StatusCodes.OK).json({ message: "Deleted successfully!" })
})

const getTotalUsers = expressAsyncHandler(async (req, res) => {
    return await User.countDocuments({})
})

// case "doctor": {
//   return await Doctor.updateOne(
//       { phone: phoneNumber, type: category },
//       { $set: data }
//   )
// }
// case "pharmacy": {
//   return await Pharmacy.updateOne(
//       { phone: phoneNumber, type: category },
//       { $set: data }
//   )
// }
// case "hospital": {
//   return await Hospital.updateOne(
//       { phone: phoneNumber, type: category },
//       { $set: data }
//   )
// }
// case "pathology": {
//   return await Pathology.updateOne(
//       { phone: phoneNumber, type: category },
//       { $set: data }
//   )
// }

const getTotalBusinesses = expressAsyncHandler(async (req, res) => {
    return (
        (await Pathology.countDocuments({})) +
        (await Hospital.countDocuments({})) +
        (await Pharmarcy.countDocuments({})) +
        (await Doctor.countDocuments({}))
    )
})

const getAdmins = expressAsyncHandler(async (req, res) => {
    let { skip, limit } = req.query
    skip = skip - "0"
    limit = limit - "0"
    if (skip === null || limit === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    } else {
        let conditions = await getConditions(req)
        const data = await Admin.find(conditions).limit(limit).skip(skip)
        const totalCount = await Admin.countDocuments(conditions)

        res.status(StatusCodes.OK).json({
            data: data,
            totalCount: totalCount,
        })
    }
})

const getProducts = expressAsyncHandler(async (req, res) => {
    let { skip, limit } = req.query
    skip = skip - "0"
    limit = limit - "0"
    if (skip === null || limit === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    } else {
        let conditions = getConditions(req)
        const data = await Product.find(conditions).limit(limit).skip(skip)
        const totalCount = await Product.countDocuments(conditions)

        res.status(StatusCodes.OK).json({
            data: data,
            totalCount: totalCount,
        })
    }
})
const getUsers = expressAsyncHandler(async (req, res) => {
    let { skip, limit } = req.query
    skip = skip - "0"
    limit = limit - "0"
    if (skip === null || limit === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    } else {
        let conditions = getConditions(req)
        const data = await User.find(conditions).limit(limit).skip(skip)
        const totalCount = await User.countDocuments(conditions)

        res.status(StatusCodes.OK).json({
            data: data,
            totalCount: totalCount,
        })
    }
})

// const getInfo = expressAsyncHandler(async (req, res, next, type) => {
//     let { skip, limit } = req.query
//     skip = skip - "0"
//     limit = limit - "0"
//     if (skip === null || limit === null) {
//         res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
//     } else {
//         let conditions = getConditions(req)
//         let data
//         let totalCount
//         if (type === "product") {
//             data = await Product.find(conditions).limit(limit).skip(skip)
//             totalCount = await Product.countDocuments(conditions)
//         } else if (type === "users") {
//             data = await User.find(conditions).limit(limit).skip(skip)
//             totalCount = await User.countDocuments(conditions)
//         } else if (type === "admins") {
//             data = await Product.find(conditions).limit(limit).skip(skip)
//             totalCount = await Product.countDocuments(conditions)
//         }

//         res.status(StatusCodes.OK).json({
//             data: data,
//             totalCount: totalCount,
//         })
//     }
// })
const loginAdmin = expressAsyncHandler(async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const admin = await Admin.findOne({ email: email })
    if (admin) {
        bcrypt.compare(password, admin.password, function (err, result) {
            if (result) {
                // Passwords match
                var token = jwt.sign(
                    {
                        id: admin._id,
                    },
                    config.has("jwt.secret") ? config.get("jwt.secret") : null,
                    {
                        expiresIn: "1h",
                    }
                )

                const payload = {
                    token,
                    isAdmin: admin.isSuperAdmin,
                    email: admin.email,
                    name: admin.name,
                }

                res.status(StatusCodes.OK).send({ status: "success", payload })
            } else {
                // Passwords don't match
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Password don't match",
                })
            }
        })
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Auth Failed",
        })
    }
})

module.exports = {
    addAdmin,
    loginAdmin,
    removeAdmin,
    getAdmins,
    getProducts,
    getUsers,
    getTotalUsers,
    getTotalBusinesses,
}
