const User = require("../../models/UserModel")
const expressAsyncHandler = require("express-async-handler")

class UserService {
	createUser = expressAsyncHandler(async (user) => {
		const existing = await this.getUser("phone", user.phone)

		if (!existing) {
			return User.create(user)
		} else {
			return existing
		}
	})

	getUser = expressAsyncHandler(async (type, value, limit, skip) => {
		if (!type) {
			return await User.find().limit(parseInt(limit)).skip(parseInt(skip))
		} else {
			let payload = {}
			payload[`${type}`] = value
			return await User.findOne(payload)
		}
	})

	updateUser = expressAsyncHandler(async (id, payload) => {
		let user = await this.getUser("_id", id)

		for (const [key, value] of Object.entries(payload)) {
			user[`${key}`] = value
		}

		return await User.findByIdAndUpdate(id, user)
	})

	async deleteUser(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await User.findByIdAndDelete(id)
				if (data) {
					resolve(true)
				}
			} catch (error) {
				return reject(error)
			}
		})
	}
}

module.exports = UserService
