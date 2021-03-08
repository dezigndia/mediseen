const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const Admin = require("../models/AdminModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10
const config = require("config")
const { isSuperAdmin } = require("../utils/adminHelper")
const { errorMessage, adminNotFound } = require("../utils/constants")

const addAdmin = expressAsyncHandler(async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    Admin.findOne({ email: email }).then(admin => {
        if (admin) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Already exists" })
        }
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
            const admin = new Admin({
                email,
                password: hashedPassword,
                name,
            })
            admin.save().then(admin => {
                res.json({ message: "saved successfully" })
            })
        })
    })
})

const removeAdmin = expressAsyncHandler(async (req, res) => {
    const { email } = req.body

    const resReq = await Admin.deleteOne({ email: email, isSuperAdmin: false })
    if (resReq.ok) {
        console.log(resReq)
        res.status(StatusCodes.OK).json({
            message: resReq.deletedCount === 0 ? adminNotFound : "Admin deleted successfully!",
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage })
    }
})

const getAdmins = expressAsyncHandler(async (req, res) => {
    let { skip, limit } = req.body

    if (skip === null || limit === null) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessage + "this one" })
    } else {
        const data = await Admin.find({}).limit(limit).skip(skip)
        const totalCount = await Admin.countDocuments({})

        res.status(StatusCodes.OK).json({
            data: data,
            totalCount: totalCount,
        })
    }
})

const loginAdmin = expressAsyncHandler(async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const admin = await Admin.findOne({ email: email })
    if (admin) {
        bcrypt.compare(password, admin.password, function (err, result) {
            if (result) {
                // Passwords match
                var token = jwt.sign(
                    {
                        id: admin._id,
                    },
                    config.has("jwt.secret") ? config.get("jwt.secret") : null,
                    {
                        expiresIn: "1h",
                    }
                )

                const payload = {
                    token,
                    isAdmin: admin.isSuperAdmin,
                    email: admin.email,
                    name: admin.name,
                }

                res.status(StatusCodes.OK).send({ status: "success", payload })
            } else {
                // Passwords don't match
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Password don't match",
                })
            }
        })
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Auth Failed",
        })
    }
})

module.exports = { addAdmin, loginAdmin, removeAdmin, getAdmins }
