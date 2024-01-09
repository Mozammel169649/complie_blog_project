const { default: mongoose, Schema } = require("mongoose");
const categoryModel = require("../category.model");
const { db_url } = require("../../../configs/db.config");



let categories = [
	{
		title: "Opinion",
		creator: "64c8470fa9aaec4787ca3a97",
	},
	{
		title: "Sports",
		creator: "64c8470fa9aaec4787ca3a98",
		status:false,
	},
	{
		title: "Business",
		creator: "64c8470fa9aaec4787ca3a98",
	},
	{
		title: "Entertainment",
		creator: "64c8470fa9aaec4787ca3a97",
	},
];

module.exports = () =>
	mongoose.connect(db_url)
		.then(async () => {

			await categoryModel.deleteMany({});
			let response = await categoryModel.insertMany(categories);

			console.log("catetgory seeding complete");

		});