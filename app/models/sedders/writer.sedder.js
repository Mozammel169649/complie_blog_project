const { default: mongoose, Schema } = require("mongoose");
const { db_url } = require("../../../configs/db.config");
const writerModel = require("../writer.model");

let writers = [
	{
		name: "Mulk Raj Anand",
		creator: "645bc6f892c7867fa8949987",
	},
	{
		name: "Khushwant Singh",
		creator: "645bc6f892c7867fa89495a9",
	},
	{
		name: "Aravind",
		creator: "645bc6f892c7867fa89495a9",
	},
	{
		name: "Vikram",
		creator: "645bc6f892c7867fa89495a9",
	},
	{
		name: "Kiran",
		creator: "645bc6f892c7867fa89495a9",
	},
];

module.exports = () =>
	mongoose.connect(db_url)
		.then(async () => {


			await writerModel.deleteMany({});
			await writerModel.insertMany(writers);

			console.log("writer seeding complete");

		});