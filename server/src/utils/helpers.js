const Appointment = require("../models/AppointmentModel");
const Order = require("../models/OrderModel");

function getTotalSalesByBusiness(phoneNumber, businessType) {
    let sales = 0;
    if(businessType === "doctor"){
        let data = await Appointment.find({businessPhoneNumber: phoneNumber})
        
    }
    else if(businessType === "pharmacy"){
        let data = await Order.find({businessPhoneNumber: phoneNumber})
        sales = data.forEach(element => {
            sales+=element.grandTotal
        });

        return sales
    }
}

module.exports = {
    getTotalSalesByBusiness,
}