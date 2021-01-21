const Hospital = require("../../models/HospitalModel")
const expressAsyncHandler = require("express-async-handler")

const {getRegex} = require('../../utils/getRegex')

class HospitalService {
	createHospital = expressAsyncHandler(async (body) => {
		return await Hospital.create(body)
	})

	getHospital = expressAsyncHandler(async (type, value, limit, skip) => {
		if (!type) {
			return await Hospital.find().limit(parseInt(limit)).skip(parseInt(skip))
		} else {
			let payload = {}
			payload[`${type}`] = getRegex(value)
			return await Hospital.findOne(payload)
		}
	})

	getAvailDocList = expressAsyncHandler(async(id)=>{
		const dayList =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		const now = new Date();
		const day = now.getDay();
		const today = dayList[day];
		const tomorrow = dayList[day+1];
		const response =  {availableToday:[ ], availableTomorrow: [ ]} ;
		const hospital = await this.getHospital("_id", id);
		const doctors = hospital.doctors;
		doctors.forEach(function(doctor) {
			if(doctor.workingHours[today]){
				response.availableToday.push(doctor)
			}
			if(doctor.workingHours[tomorrow]){
				response.availableTomorrow.push(doctor)
			}
		});
		return response;
	})

	updateHospital = expressAsyncHandler(async (id, payload) => {
		let hospital = await this.getHospital("_id", id)

		for (const [key, value] of Object.entries(payload)) {
			hospital[`${key}`] = value
		}

		return await Hospital.findByIdAndUpdate(id, hospital)
	})

	async deleteHospital(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await Hospital.findByIdAndDelete(id)
				if (data) {
					resolve(true)
				}
			} catch (error) {
				return reject(error)
			}
		})
	}
}

module.exports = HospitalService