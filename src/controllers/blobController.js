const expressAsyncHandler = require("express-async-handler")
const { StatusCodes } = require("http-status-codes")
const config = require("config")
const Busboy = require("busboy")
const s3 = require("../utils/s3Bucket")
const path = require("path")
const User = require("../models/UserModel")
class BlobController {
    blobUpload = expressAsyncHandler(async (req, res) => {
        const storage = s3
        const busboy = new Busboy({
            headers: req.headers,
            limits: {
                files: 1,
                fileSize: parseInt(config.has("aws.sizelimit") ? config.get("aws.sizelimit") : 0),
            },
        })

        busboy.on("file", (fieldname, file, filename) => {
            console.log(config.get("aws.bucket"))
            const uploadParams = {
                Bucket: config.has("aws.bucket") ? config.get("aws.bucket") : "",
                Body: file,
                Key: +new Date() + path.extname(filename),
            }

            file.on("limit", () => {
                if (!res.headersSent) {
                    return res
                        .status(StatusCodes.REQUEST_TOO_LONG)
                        .json({ status: false, message: "File size too large" })
                }

                req.unpipe()
            })

            const uploadRequest = storage.upload(uploadParams, async (err, result) => {
                if (err) {
                    console.log(err)
                    if (!res.headersSent) {
                        return res
                            .status(StatusCodes.INTERNAL_SERVER_ERROR)
                            .json({ status: false, message: "Server Error" })
                    }

                    req.unpipe()
                    return req.log.error(err)
                }

                if (!res.headersSent) {
                    await addImageURLtoUserData(res.locals.user, result.Location)
                    return res
                        .status(StatusCodes.CREATED)
                        .json({ status: true, payload: { location: result.Location } })
                }
            })

            file.on("end", () => {
                if (file.truncated) {
                    uploadRequest.abort()
                }
            })
        })

        busboy.on("filesLimit", () => {
            if (!res.headersSent) {
                return res
                    .status(StatusCodes.REQUEST_TOO_LONG)
                    .json({ status: false, message: "Too many files" })
            }

            req.unpipe()
        })

        busboy.on("error", err => {
            req.log.error(err)
            if (!res.headersSent) {
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ status: false, message: "Server Error" })
            }
        })

        req.pipe(busboy)
    })
}

async function addImageURLtoUserData(user, url) {
    if (user.type === "user") {
        const r = await User.updateOne({ phone: user.phone }, { $push: { photos: url } })
        console.log(r)
    }
}

module.exports = BlobController
