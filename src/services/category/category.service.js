const Category = require("../../models/CategoryModel")
const expressAsyncHandler = require("express-async-handler")

class CategoryService {
    createCategory = expressAsyncHandler(async (phone, type, data) => {
        let userCat = JSON.parse(JSON.stringify(await Category.findOne({userPhone: phone })))
        if (userCat) {
            console.log(userCat)
            let newCat = userCat.values.concat(data)
            console.log(newCat)
        return await Category.updateOne(
                {userPhone: phone },
                { $set: { values: newCat } }
            )
        } else {
            // let result = JSON.parse(
            //     JSON.stringify(
            //         await Category.findOne(
            //             { type, isDefault: true },
            //             { _id: 0, __v: 0, isDefault: 0 }
            //         )
            //     )
            // )
               let result ={user:"",values:""};
              result.userPhone = phone
              result.values = result.values.concat(data)
            // result._id = undefined
            //   console.log(result);
            return await Category.create(result);
        }
    })
    getAllCategories = expressAsyncHandler(async phone => {
        return await Category.find({ userPhone: phone });
    })

    getCategoriesByType = expressAsyncHandler(async (type, phone) => {
        const data = await Category.findOne({ type, userPhone: phone })
        if (data) {
            return data
        } else {
            return await Category.findOne({ type, isDefault: true })
        }
    })
}
module.exports = CategoryService
