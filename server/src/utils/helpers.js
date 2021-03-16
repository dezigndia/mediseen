const { countDocuments } = require("../models/AppointmentModel")
const Appointment = require("../models/AppointmentModel")
const Order = require("../models/OrderModel")

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
    }
    // let data = await Appointment.aggregate()
    if (businessType === "pharmacy") {
        let data = await Order.find({ businessPhoneNumber: phoneNumber })
        data.forEach(element => {
            sales += element.grandTotal
        })
        totalCount = data.length
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
