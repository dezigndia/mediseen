const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10
const config = require("config")
const { isSuperAdmin } = require("../utils/adminHelper")
const { errorMessage, adminNotFound } = require("../utils/constants")
const { getConditions, getSortingConditions } = require("../services/admin/admin.service")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")
const Pathology = require("../models/PathologyModel")
const Hospital = require("../models/HospitalModel")
const Pharmarcy = require("../models/PharmacyModel")
const Doctor = require("../models/DoctorModel")
const BusinessService = require("../services/business/business.service")
const { getTotalSalesByBusiness, getTodaysOrderByPhoneNumber } = require("../utils/helpers")
const Order = require("../models/OrderModel")
// const getConditions = require("../utils/adminHelper")
const addAdmin = expressAsyncHandler(async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const departments = req.body.departments
    Admin.findOne({ email: email }).then(admin => {
        if (admin) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Already exists" })
        }
        // bcrypt.hash(password, saltRounds).then(hashedPassword => {
        const adminNew = new Admin({
            email,
            // password: hashedPassword,
            name,
            departments,
            phoneNumber,
        })
        adminNew.save().then(admin => {
            res.status(StatusCodes.OK).json({ message: "saved successfully" })
        })
        // })
    })
})

const removeAdmin = expressAsyncHandler(async (req, res) => {
    const { emails } = req.body
    // console.log(req.body)
    let resReq
    emails.forEach(async email => {
        resReq = await Admin.deleteOne({ email: email, isSuperAdmin: false })
        if (!resReq.ok) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        }
    })

    // console.log(resReq)
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
    let data =
        (await Pathology.countDocuments({})) +
        (await Hospital.countDocuments({})) +
        (await Pharmarcy.countDocuments({})) +
        (await Doctor.countDocuments({}))

    if (data) {
        res.status(200).json(data)
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    }
})

const getAdmins = expressAsyncHandler(async (req, res) => {
    let { skip, limit } = req.query
    skip = skip - "0"
    limit = limit - "0"
    if (skip === null || limit === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    } else {
        let conditions = await getConditions(req)
        conditions = {
            ...conditions,
            isSuperAdmin: false,
        }
        let data = await Admin.find(conditions).limit(limit).skip(skip)
        const totalCount = await Admin.countDocuments(conditions)
        data.forEach((each, i) => {
            data[i].password = undefined
        })
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
        console.log(data, "data")
        const totalCount = await Product.countDocuments(conditions)

        res.status(StatusCodes.OK).json({
            data: data,
            totalCount: totalCount,
        })
    }
})
const getOrders = expressAsyncHandler(async (req, res) => {
    let { skip, limit } = req.query
    skip = skip - "0"
    limit = limit - "0"
    if (skip === null || limit === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    } else {
        let conditions = getConditions(req)
        let sortby = await getSortingConditions(req)
        // console.log(sortby)
        const data = await Order.find(conditions).limit(limit).sort(sortby).skip(skip)
        const totalCount = await Order.countDocuments(conditions)

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
        // var pincode = req.query.pincode - "0"

        let data = await User.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "phone",
                    foreignField: "userPhoneNumber",
                    as: "order_details",
                },
            },
            // {
            //     $match: {
            //         address: {
            //             $elemMatch: {
            //                 pincode: pincode,
            //             },
            //         },
            //     },
            // },
            { $limit: limit },
            { $skip: skip },
            {
                $project: {
                    address: 1,
                    order_details: 1,
                },
            },
        ])
        // .find(conditions)
        // .limit(limit)
        // .skip(skip)
        const totalCount = data.length
        data.forEach((each, i) => {
            data[i].totalCost = 0
            data[i].order_details.forEach(order => {
                data[i].totalCost += order.grandTotal || 0
                // console.log(order.grandTotal)
            })
            data[i].order_details = undefined
        })
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
    // console.log(email, password, req.body)
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
                        expiresIn: "24h",
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
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            message: "Auth Failed",
        })
    }
})

const bs = new BusinessService()

const getBusinessList = expressAsyncHandler(async (req, res) => {
    const { limit, skip } = req.query
    let conditions = await getConditions(req)
    let sortCon = await getSortingConditions(req)
    let data = await Doctor.find(conditions)
        .sort(sortCon)
        .limit(parseInt(limit))
        .skip(parseInt(skip))
    let totalCount = await Doctor.countDocuments(conditions)
    // bs.getAllBusiness(limit, skip, category, specialist, area, search)
    let reqData = []
    if (data) {
        let arr = data.map(async (each, i) => {
            // let call = async () => {
            //     return new Promise(next => {
            let ans = await getTotalSalesByBusiness(
                each.phone,
                each.type,
                each._doc.collections && each._doc.collections.collectionChargesPerVisit
                    ? each._doc.collections.collectionChargesPerVisit
                    : 0
            )
            let oToday = {
                orderToday: await getTodaysOrderByPhoneNumber(each.phone),
            }
            reqData.push({ ...data[i]._doc, ...ans, ...oToday })
            // console.log(reqData[i])
        })
        Promise.all(arr).then(req => {
            return res
                .status(StatusCodes.OK)
                .json({ status: true, payload: { reqData, totalCount } })
        })
        // return res.status(StatusCodes.OK).json({ status: true, payload: data })
    } else {
        throw new AppError(StatusCodes.NOT_FOUND, "Businesss List not found.")
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
    getBusinessList,
    getTotalBusinesses,
    getOrders,
}
