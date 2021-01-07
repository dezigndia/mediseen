const client = require("twilio")(process.env.TWILIO_ID, process.env.TWILIO_AUTH)

class AuthService {
    /**
	 * @author sanjay
	 * @description service which will process the incoming request data and send response back to controller
	 * @param {object} requestData
	 */
    async login(requestData) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await client.verify
				.services(process.env.TWILIO_SERVICE)
				.verifications.create({
					to: `+91${requestData.phoneNumber}`,
					channel: "sms",
                });
                if (data.status === "pending") {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            } catch (error) {
                return reject(error);
            }
        })
    }
}

module.exports = AuthService;