const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;


class AdminController {
  register = expressAsyncHandler(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password
  
  Admin.findOne({email:email})
  .then((admin)=>{
    if(admin){
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({message:"Already exists"})
    }
    bcrypt.hash(password, saltRounds)
    .then(hashedPassword=>{
      const admin = new Admin({
        email,
        password:hashedPassword,
        name
      })
      admin.save()
      .then(admin=>{
        res.json({message:"saved successfully"})
      })

    })
  })
  });

    

  login = expressAsyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await Admin.findOne({ email:email });
			if (admin) {
        bcrypt.compare(password, admin.password, function(err, result) {
          if(result) {
           // Passwords match
           var token = jwt.sign(
                  {
                    id:admin._id
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1h",
                  }
                )
        
                const payload = {
                  token
                }
          
                res.status(StatusCodes.OK).send({ status: "success", payload })
              
           } else {
           // Passwords don't match
          res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Password don't match",
          })
          } 
        });
     		
			} else {
				res.status(StatusCodes.NOT_FOUND).json({
					message: "Auth Failed",
				})
			}
		
 });
}
module.exports = AdminController;
