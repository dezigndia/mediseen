const { countDocuments } = require("../models/AppointmentModel")
const Appointment = require("../models/AppointmentModel")
const Order = require("../models/OrderModel")
const Doctor = require("../models/DoctorModel")

async function getTotalSalesByBusiness(phoneNumber, businessType, price = 0) {
    let sales = 0,
        totalCount = 0
    if (businessType === "doctor" || businessType === "hospital") {
        let data = await Appointment.aggregate([
            {
                $match: {
                    businessPhoneNumber: phoneNumber,
                },
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
                },
            },
        ])
        console.log(data)
    } else if (businessType === "pharmacy") {
        let data = await Order.aggregate([
            {
                $match: {
                    businessPhoneNumber: phoneNumber,
                },
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
        sales = data[0].sum
        totalCount = data[0].myCount
        console.log("pharmacy sales", sales, totalCount, data)
    } else if (businessType === "pathology") {
        totalCount = await Order.countDocuments({ businessPhoneNumber: phoneNumber })
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
