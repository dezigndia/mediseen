const mongoose = require("mongoose")

const daySchema = new mongoose.Schema({
	_id: false,
	from: Number,
	to: Number,
})

const workSchema = new mongoose.Schema({
	_id: false,
	Monday: daySchema,
	Tuesday: daySchema,
	Wednesday: daySchema,
	Thursday: daySchema,
	Fridday: daySchema,
	Saturday: daySchema,
	Sunday: daySchema,
})

module.exports = workSchema