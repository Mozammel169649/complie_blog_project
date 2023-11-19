const { default: mongoose, Schema } = require("mongoose");
const translatorModel = require("../translator.model");
const { db_url } = require("../../../configs/db.config");

let data = [
	{
		name: "Mulk Raj Anand",
		creator: "64c8470fa9aaec4787ca3a97",
	},
	{
		name: "Khushwant Singh",
		creator: "64c8470fa9aaec4787ca3a98",
	},
	{
		name: "Aravind",
		creator: "64c8470fa9aaec4787ca3a97",
	},
	{
		name: "Vikram",
		creator: "64c8470fa9aaec4787ca3a98",
	},
	{
		name: "Kiran",
		creator: "64c8470fa9aaec4787ca3a97",
	},
];

module.exports = () =>
	mongoose.connect(db_url)
		.then(async () => {


			await translatorModel.deleteMany({});
			await translatorModel.insertMany(data);

			console.log("translator seeding complete");
		});