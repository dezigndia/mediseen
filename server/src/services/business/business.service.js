const Doctor = require("../../models/DoctorModel")
const expressAsyncHandler = require("express-async-handler")

class BusinessService {
    getAllBusiness = expressAsyncHandler(async (limit, skip, category, specialist, area, search) => {
        let filter = {}
        const responseData=[];
        if (area) {
            filter.area = area
        }
        if (specialist) {
            filter.specialist = specialist
        }
        if (category) {
            filter.type = category
        }
        let res = await Doctor.find(filter).limit(parseInt(limit)).skip(parseInt(skip))
        console.log(res);
        if(search){
            let firstName,middleName, lastName;
            function escapeRegex(text) {
                return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
              };
            const op = search.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } )
            firstName= op[0];
            if(op.length>2){
                middleName = op[1];
                lastName=op[2];
            }else if(op.length>1){
                lastName= op[1];
            }

            //   const regex = new RegExp(escapeRegex(search), 'gi');
            //   const regexFirstName= new RegExp(escapeRegex(firstName),'gi');
            //   const regexLastName = new RegExp(escapeRegex(lastName),'gi');
              res.forEach(function(business){
                  if(business.buisnessName===search || business.firstName===firstName || business.lastName===lastName){
                        responseData.push(business);
                  }
              })
              return responseData;
        }else{
            return res;
        }
    })
}
module.exports = BusinessService
