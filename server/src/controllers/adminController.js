const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10
const config = require("config")
const { isSuperAdmin } = require("../utils/adminHelper")
const { errorMessage, adminNotFound } = require("../utils/constants")
const {
    getConditions,
    getSortingConditions,
    getFirstOfWeek,
} = require("../services/admin/admin.service")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")
const Pathology = require("../models/PathologyModel")
const Hospital = require("../models/HospitalModel")
const Pharmarcy = require("../models/PharmacyModel")
const Doctor = require("../models/DoctorModel")
const BusinessService = require("../services/business/business.service")
const { getTotalSalesByBusiness, getTodaysOrderByPhoneNumber } = require("../utils/helpers")
const Order = require("../models/OrderModel")
const Test = require("../models/TestModel")
const Appointment = require("../models/AppointmentModel")
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
    if (emails && emails.length > 0) {
        let resReq
        emails.forEach(async email => {
            resReq = await Admin.deleteOne({ email: email, isSuperAdmin: false })
            if (!resReq.ok) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
            }
        })

        // console.log(resReq)
        res.status(StatusCodes.OK).json({ message: "Account deleted successfully!" })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Emails not sent!" })
    }
})

const removeProduct = expressAsyncHandler(async (req, res) => {
    const { prodId, testId } = req.body
    // console.log(req.body)
    if (prodId) {
        let resReq = await Product.deleteOne({ _id: prodId })
        if (!resReq.ok) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        } else {
            res.status(StatusCodes.OK).json({ message: "Product deleted successfully!" })
        }
    } else if (testId) {
        let resReq = await Test.deleteOne({ _id: testId })
        if (!resReq.ok) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        } else {
            res.status(StatusCodes.OK).json({ message: "Test deleted successfully!" })
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Id not sent!" })
    }
})

const getTotalUsers = expressAsyncHandler(async (req, res) => {
    return await User.countDocuments({})
})

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
        // console.log(data, "data")
        const totalCount = await Product.countDocuments(conditions)

        res.status(StatusCodes.OK).json({
            data: data,
            totalCount: totalCount,
        })
    }
})
const getTests = expressAsyncHandler(async (req, res) => {
    let { skip, limit } = req.query
    skip = skip - "0"
    limit = limit - "0"
    if (skip === null || limit === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    } else {
        let conditions = getConditions(req)
        const data = await Test.find(conditions).limit(limit).skip(skip)
        console.log(data, "data")
        const totalCount = await Test.countDocuments(conditions)

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
        let { name, pincode, phone } = req.query

        let filter = {}
        if (name) {
            filter.name = new RegExp(name)
        }
        if (pincode) {
            filter.pincode = pincode
        }
        if (phone) {
            filter.phone = phone
        }
        let data = await User.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "phone",
                    foreignField: "userPhoneNumber",
                    as: "order_details",
                },
            },
            {
                $match: filter,
            },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    order_details: 1,
                    name: 1,
                    phone: 1,
                    address: 1,
                },
            },
            {
                $facet: {
                    result: [{ $skip: skip }, { $limit: limit }],
                    totalCount: [
                        {
                            $count: "count",
                        },
                    ],
                },
            },
        ])
        // .find(conditions)
        // .limit(limit)
        // .skip(skip)
        console.log(data[0].totalCount, "users data")
        const totalCount = data[0].totalCount[0].count
        let dataReq = []
        data[0].result.forEach((each, i) => {
            dataReq.push(each)
            dataReq[i].totalCost = 0
            each.order_details.forEach(order => {
                dataReq[i].totalCost += order.grandTotal || 0
                // console.log(order.grandTotal)
            })
            dataReq[i].order_details = undefined
        })
        res.status(StatusCodes.OK).json({
            data: dataReq,
            totalCount: totalCount,
        })
    }
})

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

const getMonthlyOrderTrend = expressAsyncHandler(async (req, res) => {
    let { year } = req.query

    if (year) {
        let data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year, 11, 1),
                    },
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    grandTotal: { $sum: "$grandTotal" },
                },
            },
        ])
        res.status(StatusCodes.OK).json({ data: data })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "send year" })
    }
})
const getWeeklyAppointmentTrend = expressAsyncHandler(async (req, res) => {
    let { date } = req.body
    if (date) {
        let reqDate = getFirstOfWeek(date)
        console.log(reqDate, date)

        let data = await Appointment.aggregate([
            // {
            //     $match: {
            //         createdAt: {
            //             $gte: reqDate,
            //             $lt: date,
            //         },
            //     },
            // },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
        ])
        res.status(StatusCodes.OK).json({ data: data })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "send date" })
    }
})

// const activeBusinessThisMonth = expressAsyncHandler(async (req, res) => {
//     let {month} = req.query

//     let data = await Business.find({})
// })
const getNewBusinessCount = expressAsyncHandler(async (req, res) => {
    let date = new Date()
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    let currentMonthCount = await Doctor.countDocuments({
        createdAt: {
            $gte: date,
        },
    })
    let previousDate = new Date(date)
    previousDate.setDate(0)
    previousDate.setDate(1)
    let previousMonthCount = await Doctor.countDocuments({
        createdAt: {
            $gte: previousDate,
            $lt: date,
        },
    })

    if (previousMonthCount >= 0 && currentMonthCount >= 0)
        res.status(StatusCodes.OK).json({
            currentMonthCount: currentMonthCount,
            prevMonthCount: previousMonthCount,
        })
    else res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
})

const patientCount = expressAsyncHandler(async (req, res) => {
    let count1 = await Order.distinct("userPhoneNumber")
    let count2 = await Appointment.distinct("userPhoneNumber")
    res.status(200).json({ count: count1.length + count2.length })
})
const totalOAMonth = expressAsyncHandler(async (req, res) => {
    let date = new Date()
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    let count1 = await Order.countDocuments({
        createdAt: {
            $gte: date,
        },
    })
    let count2 = await Appointment.countDocuments({
        createdAt: {
            $gte: date,
        },
    })
    res.status(200).json({ count: count1 + count2 })
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
    getTests,
    getMonthlyOrderTrend,
    getWeeklyAppointmentTrend,
    removeProduct,
    getNewBusinessCount,
    patientCount,
    totalOAMonth,
}
