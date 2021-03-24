const { countDocuments } = require("../models/AppointmentModel")
const Appointment = require("../models/AppointmentModel")
const Order = require("../models/OrderModel")
const Doctor = require("../models/DoctorModel")
const { FileSystemCredentials } = require("aws-sdk")

async function getTotalSalesByBusiness(phoneNumber, businessType, price = 0) {
    let sales = 0,
        totalCount = 0
    if (businessType === "doctor" || businessType === "hospital") {
        let filter = {}
        if (phoneNumber) {
            filter.businessPhoneNumber = phoneNumber
        }
        filter.businessType = businessType
        let data = await Appointment.aggregate([
            {
                $match: filter,
            },
            {
                $project: {
                    grandTotal: 1,
                    _id: 0,
                },
            },
            {
                $group: {
                    _id: null,
                    sum: {
                        $sum: "$grandTotal",
                    },
                    myCount: {
                        $sum: 1,
                    },
                },
            },
        ])
        sales = data[0] ? data[0].sum : 0
        totalCount = data[0] ? data[0].myCount : 0
    } else if (businessType === "pharmacy") {
        let filter = {}
        if (phoneNumber) {
            filter.businessPhoneNumber = phoneNumber
        }
        filter.businessType = businessType
        let data = await Order.aggregate([
            {
                $match: filter,
            },
            {
                $project: {
                    grandTotal: 1,
                    _id: 0,
                },
            },
            {
                $group: {
                    _id: null,
                    sum: {
                        $sum: "$grandTotal",
                    },
                    myCount: { $sum: 1 },
                },
            },
        ])
        sales = data[0] ? data[0].sum : 0
        totalCount = data[0] ? data[0].myCount : 0
    } else if (businessType === "pathology") {
        let filter = {}
        if (phoneNumber) {
            filter.businessPhoneNumber = phoneNumber
        }
        filter.businessType = businessType

        totalCount = await Order.countDocuments(filter)
        sales += totalCount * price
    }
    // console.log(phoneNumber, businessType, price, { sales: sales, totalCount: totalCount })
    return { sales: sales, totalCount: totalCount }
}
async function getTodaysOrderByPhoneNumber(phoneNumber) {
    var d = new Date()
    d.setHours(0, 0, 0, 0)
    let count = await Order.countDocuments({
        businessPhoneNumber: phoneNumber,
        createdAt: { $gte: d },
    })

    return count
}

module.exports = {
    getTotalSalesByBusiness,
    getTodaysOrderByPhoneNumber,
}
