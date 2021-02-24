const aws = require("aws-sdk")
const config = require("config")
const region = config.has("aws.region") ? config.get("aws.region") : ""
aws.config.update({ region: region, apiVersion: "2006-03-01" })

const s3 = new aws.S3({
    region: region,
    apiVersion: "2006-03-01",
    credentials: {
        accessKeyId: config.has("aws.accessKeyId") ? config.get("aws.accessKeyId") : "",
        secretAccessKey: config.has("aws.secretAccessKey") ? config.get("aws.secretAccessKey") : "",
    },
})

module.exports = s3
