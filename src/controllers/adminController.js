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
const AuthService = require("../services/auth/auth.service")
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
            resReq = await Admin.findOneAndUpdate(
                { email: email, isSuperAdmin: false },
                { active: false }
            )
            if (!resReq) {
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
    let { prodId, testId, status } = req.body
    status = status || false
    console.log(prodId, testId, status)
    if (prodId) {
        let resReq = await Product.findOneAndUpdate({ _id: prodId }, { isActive: status })
        if (resReq) {
            res.status(StatusCodes.OK).json({ message: "Product status updated successfully!" })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        }
    } else if (testId) {
        let resReq = await Test.findOneAndUpdate({ _id: testId }, { isActive: status })
        if (resReq) {
            res.status(StatusCodes.OK).json({ message: "Test status updated successfully!" })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Id not sent!" })
    }
})

const getTotalUsers = expressAsyncHandler(async (req, res) => {
    let data = await User.countDocuments({})
    res.status(StatusCodes.OK).json({ count: data })
})

const getTotalBusinesses = expressAsyncHandler(async (req, res) => {
    let data =
        // (await Pathology.countDocuments({})) +
        // (await Hospital.countDocuments({})) +
        // (await Pharmarcy.countDocuments({})) +
        await Doctor.countDocuments({})

    res.status(StatusCodes.OK).json(data)
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
            active: true,
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
        // console.log(data, "data")
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
        const totalCount =
            data[0] && data[0].totalCount && data[0].totalCount[0] && data[0].totalCount[0].count
                ? data[0].totalCount[0].count
                : 0
        let dataReq = []
        data[0].result.forEach((each, i) => {
            dataReq.push(each)
            dataReq[i].totalCost = 0
            each.order_details.forEach(order => {
                dataReq[i].totalCost += order.grandTotal || 0
                // console.log(order.grandTotal)
            })
            // dataReq[i].order_details = undefined
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
        if (admin.password) {
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
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Password for this email does not exist, contact admin",
            })
        }
    } else {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            message: "Auth Failed",
        })
    }
})

const bs = new BusinessService()
const as = new AuthService()
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
            if (each.phone) {
                let ans = await getTotalSalesByBusiness(each.phone, each.type)
                let oToday = {
                    orderToday: await getTodaysOrderByPhoneNumber(each.phone, each.type),
                }
                reqData.push({ ...data[i]._doc, ...ans, ...oToday })
            }
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

const getOrderTrend = expressAsyncHandler(async (req, res) => {
    let { date, type } = req.query
    let d = new Date(date)
    let year = d.getFullYear()
    let lowerDate = type === "monthly" ? new Date(year, 0, 1) : getFirstOfWeek(date)
    let upperDate = d
    // console.log(lowerDate, upperDate, "date")

    if (year) {
        let data = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: lowerDate,
                        $lt: upperDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        day: {
                            $dayOfMonth: "$createdAt",
                        },
                    },
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
        // console.log(reqDate, date)

        let data = await Appointment.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: reqDate,
                        $lt: new Date(date),
                    },
                },
            },
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

    res.status(StatusCodes.OK).json({
        currentMonthCount: currentMonthCount,
        prevMonthCount: previousMonthCount,
    })
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

const totalRelativeAmount = expressAsyncHandler(async (req, res) => {
    const pharmacySales = await getTotalSalesByBusiness(null, "pharmacy", null)
    const hospitalSales = await getTotalSalesByBusiness(null, "hospital", null)
    const doctorSales = await getTotalSalesByBusiness(null, "doctor", null)
    const pathologySales = await getTotalSalesByBusiness(null, "pathology", null)

    res.status(StatusCodes.OK).json({ pharmacySales, hospitalSales, doctorSales, pathologySales })
})

const updateBusinessStatus = expressAsyncHandler(async (req, res) => {
    let { id, status } = req.body

    // let data = await Doctor.updateOne({})
    var query = { id: id }

    // let data = await Doctor.find(query)
    let data = await Doctor.findOneAndUpdate(query, { $set: { isActive: status } })

    return res.status(200).json({ message: "Updated successfully" })
})
const sendAdminOTP = expressAsyncHandler(async (req, res) => {
    let { phoneNumber } = req.body
    let user = await Admin.findOne({ phoneNumber: phoneNumber })

    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "User with this phone number does not exist",
        })
    } else if (user.password) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Login using password" })
    } else {
        let data = as.sendOTP(phoneNumber, "admin")
        res.status(StatusCodes.OK).json({ message: "Otp sent", data: data })
    }
})
const verifyOTP = expressAsyncHandler(async (req, res) => {
    let { phoneNumber, otp,businessType } = req.body
    // let user = Admin.findOne({phoneNumber: phoneNumber})

    let data = await as.verifyOtp(phoneNumber, otp, businessType,"admin")
    console.log(data)
    if (data.isRegistered) {
        var token = jwt.sign(
            {
                id: data.admin._id,
            },
            config.has("jwt.secret") ? config.get("jwt.secret") : null,
            {
                expiresIn: "24h",
            }
        )
        const payload = {
            token,
            isAdmin: data.admin.isSuperAdmin,
            email: data.admin.email,
            name: data.admin.name,
        }
        res.status(StatusCodes.OK).send({ status: "success", payload })
    } else {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
            message: "Auth failed",
        })
    }
})

const setPassword = expressAsyncHandler(async (req, res) => {
    let { confirmPassword, email, password } = req.body

    if (confirmPassword !== password) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Confirm password and password don't match",
        })
    } else {
        Admin.findOne({ email: email })
            .then(admin => {
                if (admin) {
                    bcrypt.hash(password, saltRounds).then(hashedPassword => {
                        // const adminNew = new Admin({
                        //     password: hashedPassword,
                        // })
                        admin.password = hashedPassword
                        admin
                            .save()
                            .then(admin => {
                                res.status(StatusCodes.OK).json({ message: "saved successfully" })
                            })
                            .catch(e => {
                                return res
                                    .status(StatusCodes.BAD_REQUEST)
                                    .json({ message: errorMessage })
                            })
                    })
                } else {
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
                }
            })
            .catch(e => {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
            })
    }
})

const totalActiveBusiness = expressAsyncHandler(async (req, res) => {
    let date = new Date()
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    let count = await Order.countDocuments({
        createdAt: {
            $gte: date,
        },
    }).distinct("businessPhoneNumber")

    res.status(StatusCodes.OK).json({ count: count.length })
})

const newOAMonth = expressAsyncHandler(async (req, res) => {
    let date = new Date()
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    let filter = {}
    filter.createdAt = {
        $gte: date,
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
        {
            $project: {
                order_details: 1,
            },
        },
    ])

    let data2 = await User.aggregate([
        {
            $lookup: {
                from: "appointments",
                localField: "phone",
                foreignField: "userPhoneNumber",
                as: "order_details",
            },
        },
        {
            $match: filter,
        },
        {
            $project: {
                order_details: 1,
            },
        },
    ])
    let newDate = new Date(date)
    newDate.setDate(0)
    newDate.setDate(1)
    filter.createdAt = {
        $lt: date,
        $gte: newDate,
    }

    let data3 = await User.aggregate([
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
        {
            $project: {
                order_details: 1,
            },
        },
    ])

    let data4 = await User.aggregate([
        {
            $lookup: {
                from: "appointments",
                localField: "phone",
                foreignField: "userPhoneNumber",
                as: "order_details",
            },
        },
        {
            $match: filter,
        },
        {
            $project: {
                order_details: 1,
            },
        },
    ])
    let count = 0,
        countPrev = 0

    data.forEach(each => {
        count += each.order_details.length
    })
    data2.forEach(each => {
        count += each.order_details.length
    })

    data3.forEach(each => {
        countPrev += each.order_details.length
    })
    data4.forEach(each => {
        countPrev += each.order_details.length
    })
    res.status(StatusCodes.OK).json({ count, countPrev })
})
const successOA = expressAsyncHandler(async (req, res) => {
    let date = new Date()
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    let newDate = new Date(date)
    newDate.setDate(0)
    newDate.setDate(1)

    let reqDate = new Date(newDate)
    reqDate.setDate(0)
    reqDate.setDate(1)

    let filter = {
        createdAt: {
            $gte: date,
        },
    }
    let count1 = await Order.countDocuments({
        status: "accepted",
        ...filter,
    })
    let count2 = await Appointment.countDocuments({
        status: "confirmed",
        ...filter,
    })
    filter.createdAt = {
        $gte: reqDate,
        $lt: newDate,
    }
    let count1Prev = await Order.countDocuments({
        status: "accepted",
        ...filter,
    })

    let count2Prev = await Order.countDocuments({
        status: "accepted",
        ...filter,
    })
    res.status(StatusCodes.OK).json({ count: count1 + count2, countPrev: count1Prev + count2Prev })
})

const returningBusiness = expressAsyncHandler(async (req, res) => {
    let date = new Date()
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    let dataCurrentMonth = await Order.find({
        createdAt: {
            $gte: date,
        },
    }).select({ businessPhoneNumber: 1, _id: 0 })
    let newDate = new Date(date)
    newDate.setDate(0)
    newDate.setDate(1)

    let dataPrevMonth = await Order.find({
        createdAt: {
            $gte: newDate,
            $lt: date,
        },
    }).select({ businessPhoneNumber: 1, _id: 0 })

    let reqDate = new Date(newDate)
    reqDate.setDate(0)
    reqDate.setDate(1)

    let dataPrev2 = await Order.find({
        createdAt: {
            $gte: newDate,
            $lt: date,
        },
    }).select({ businessPhoneNumber: 1, _id: 0 })

    let count = 0,
        countPrev = 0
    let array1 = [],
        array2 = []

    dataPrev2.forEach(each => {
        array2.push(each.businessPhoneNumber)
    })

    dataPrevMonth.forEach(each => {
        array1.push(each.businessPhoneNumber)

        if (array2.indexOf(each.businessPhoneNumber) == -1) countPrev++
    })

    dataCurrentMonth.forEach(each => {
        if (array1.indexOf(each.businessPhoneNumber) == -1) count++
    })
    res.status(StatusCodes.OK).json({ count, countPrev })
})

const returningPatients = expressAsyncHandler(async (req, res) => {
    let date = new Date()
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    let orderDataCurrentMonth = await Order.find({
        createdAt: {
            $gte: date,
        },
    }).select({ userPhoneNumber: 1, _id: 0 })
    let appointmentDataCurrentMonth = await Appointment.find({
        createdAt: {
            $gte: date,
        },
    }).select({ userPhoneNumber: 1, _id: 0 })
    let newDate = new Date(date)
    newDate.setDate(0)
    newDate.setDate(1)
    let orderDataPrevMonth = await Order.find({
        createdAt: {
            $gte: newDate,
            $lt: date,
        },
    }).select({ userPhoneNumber: 1, _id: 0 })
    let appointmentDataPrevMonth = await Appointment.find({
        createdAt: {
            $gte: newDate,
            $lt: date,
        },
    }).select({ userPhoneNumber: 1, _id: 0 })
    let reqDate = new Date(newDate)
    reqDate.setDate(0)
    reqDate.setDate(1)

    let orderDataPrev2 = await Order.find({
        createdAt: {
            $gte: reqDate,
            $lt: newDate,
        },
    }).select({ userPhoneNumber: 1, _id: 0 })
    let appointmentDataPrev2 = await Appointment.find({
        createdAt: {
            $gte: reqDate,
            $lt: newDate,
        },
    }).select({ userPhoneNumber: 1, _id: 0 })

    let count = 0,
        countPrev = 0
    let array1 = [],
        array2 = []
    orderDataPrev2.forEach(each => {
        array2.push(each.userPhoneNumber)
    })
    appointmentDataPrev2.forEach(each => {
        array2.push(each.userPhoneNumber)
    })
    orderDataPrevMonth.forEach(each => {
        array1.push(each.userPhoneNumber)

        if (array2.indexOf(each.userPhoneNumber) == -1) countPrev++
    })
    appointmentDataPrevMonth.forEach(each => {
        array1.push(each.userPhoneNumber)

        if (array2.indexOf(each.userPhoneNumber) == -1) countPrev++
    })

    orderDataCurrentMonth.forEach(each => {
        if (array1.indexOf(each.userPhoneNumber) == -1) count++
    })
    appointmentDataCurrentMonth.forEach(each => {
        if (array1.indexOf(each.userPhoneNumber) == -1) count++
    })

    res.status(StatusCodes.OK).json({
        count,
        countPrev,
    })
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
    getOrderTrend,
    getWeeklyAppointmentTrend,
    removeProduct,
    getNewBusinessCount,
    patientCount,
    totalOAMonth,
    totalRelativeAmount,
    updateBusinessStatus,
    sendAdminOTP,
    verifyOTP,
    setPassword,
    totalActiveBusiness,
    newOAMonth,
    successOA,
    returningBusiness,
    returningPatients,
}
