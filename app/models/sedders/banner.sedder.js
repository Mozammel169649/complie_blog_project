const { default: mongoose} = require("mongoose");
const { db_url } = require("../../../configs/db.config");
const bannerModel = require("../banner.model");



const demo_banner= async () => {
	return {
		title: "Men's football team finally going to Asiad",
		category: "mozammel",
		creator: "mozammel",
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