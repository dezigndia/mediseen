const Doctor = require("../../models/DoctorModel")
const expressAsyncHandler = require("express-async-handler")

class DoctorService {
    createDoctor = expressAsyncHandler(async body => {
        return Doctor.create(body)
    })

    getDoctor = expressAsyncHandler(async (type, value, limit, skip) => {
        if (!type) {
            return await Doctor.find().limit(parseInt(limit)).skip(parseInt(skip))
        } else {
            let payload = {}
            payload[`${type}`] = value
            return await Doctor.findOne(payload)
        }
    })

    getAvailHosList = expressAsyncHandler(async(id)=>{
		const dayList =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		const now = new Date();
		const day = now.getDay();
		const today = dayList[day];
		const tomorrow = dayList[day+1];
		const response =  {availableToday:[ ], availableTomorrow: [ ]} ;
		const doctor = await this.getDoctor("_id", id);
		const clinic = doctor.clinic;
		clinic.forEach(function(clinic) {
			if(clinic.workingHours[today]){
				response.availableToday.push(clinic)
			}
			if(clinic.workingHours[tomorrow]){
				response.availableTomorrow.push(clinic)
			}
		});
		return response;
	})

    updateDoctor = expressAsyncHandler(async (id, payload) => {
        let doctor = await this.getDoctor("_id", id)

        for (const [key, value] of Object.entries(payload)) {
            doctor[`${key}`] = value
        }

        return await Doctor.findByIdAndUpdate(id, doctor)
    })

    async deleteDoctor(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await Doctor.findByIdAndDelete(id)
                if (data) {
                    resolve(true)
                }
            } catch (error) {
                return reject(error)
            }
        })
    }
}

module.exports = DoctorService
