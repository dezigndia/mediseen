const Doctor = require("../../models/DoctorModel")
const expressAsyncHandler = require("express-async-handler")
const {getRegex, splitStringRegex} = require('../../utils/getRegex')

class BusinessService {
    getAllBusiness = expressAsyncHandler(async (limit, skip, category, specialist, area, search) => {
        let filter = {}
        let searchfirstName,searchmiddleName, searchlastName;
        const responseData=[];
        if (area) {
            filter.area = getRegex(area)
        }
        if (specialist) {
            filter.specialist = getRegex(specialist)
        }
        if (category) {
            filter.type = getRegex(category)
        }
        let res = await Doctor.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
        if(search && res.length>0){
            const op = splitStringRegex(search);
            searchfirstName= op[0];
            if(op.length>2){
                searchmiddleName = op[1];
                searchlastName=op[2];
            }else if(op.length>1){
                searchlastName= op[1];
            }
            res.forEach(function(business){
                const {businessName, firstName,middleName, lastName}= business;
                  if((getRegex(search).test(businessName)) || (getRegex(searchfirstName).test(firstName) || getRegex(searchlastName).test(lastName))
                   || (getRegex(searchlastName).test(firstName) || getRegex(searchfirstName).test(lastName) || getRegex(searchfirstName).test(middleName)
                   || getRegex(searchmiddleName).test(middleName) || getRegex(searchmiddleName).test(lastName) )
                  ){
                        responseData.push(business);
                  }
            })
            return responseData;
        }else if(search && res.length===0){
            return Doctor.find({$or:
                [
                    {"businessName" :  getRegex(search)},
                    { "firstName"   :  getregex(searchfirstName) },
                    { "middleName"  :  getRegex(searchmiddleName)},
                    { "lastName"    :  getregex(searchlastname)},
                ]
              })
        }
        return res;
    })
}
module.exports = BusinessService
