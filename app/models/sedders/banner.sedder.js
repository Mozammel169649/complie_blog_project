const { default: mongoose,} = require("mongoose");
const { db_url } = require("../../../configs/db.config");
const categoryModel = require("../category.model");
const userModel = require("../user.model");
const bannerModel = require("../banner.model");



const get_category_ids = async () => {
	let categories = await categoryModel.find();
	return categories.map(i => i._id.toString());
}

const get_user_id = async () => {
	let user = await userModel.findOne();
	return user._id;
}

const demo_banner= async () => {
	return {
		title: "Men's football team finally going to Asiad",
		category: await get_category_ids(),
		creator: await get_user_id(),
		writing_date: "2023-01-25 ",
		thumb_image: "images/1.jpg",
	};
}

module.exports = () =>
	mongoose.connect(db_url)
		.then(async () => {

			await bannerModel.deleteMany({});
			await bannerModel.create(await demo_banner());

			console.log("banner seeding complete");
		});