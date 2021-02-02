const Doctor = require("../../models/DoctorModel")
const expressAsyncHandler = require("express-async-handler")
const {getRegex, splitStringRegex} = require('../../utils/getRegex')

class BusinessService {

    getBusinessById = expressAsyncHandler(async(id)=>{
        return await Doctor.findById(id);
    })

    getAllBusiness = expressAsyncHandler(async (limit, skip, category, specialist, area, search) => {
        let filter = {}
        if (area) {
            filter.area = getRegex(area)
        }
        if (specialist) {
            filter.specialist = getRegex(specialist)
        }
        if (category) {
            filter.type = getRegex(category)
        }
        if(search){
            const op = splitStringRegex(search);
            const   searchfirstName= op[0];
            return Doctor.find({$or:
                [
                    {"businessName" :  getRegex(search)},
                    { "firstName"   :  getRegex(searchfirstName) },
                ],
                $and:[filter]
              })
        }else{
            return await Doctor.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
        }
    })

    
}
module.exports = BusinessService
