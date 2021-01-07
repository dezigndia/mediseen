const client = require("twilio")(process.env.TWILIO_ID, process.env.TWILIO_AUTH)

class AuthService {
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