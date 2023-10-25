const { default: mongoose, Schema } = require("mongoose");

const { db_url } = require("../../../configs/db.config");
const mediaModel = require("../media.model");


const demo_media = async () => {
	return {
		title: "facebook",
		icon : "<i class='fa fa-facebook' aria-hidden='true'></i>",
		unite : "Like",
		count : 20.3,
		link : "https://www.facebook.com/",
	};
}

module.exports = () =>
	mongoose.connect(db_url)
		.then(async () => {

			await mediaModel.deleteMany({});
			await mediaModel.create(await demo_media() );

			console.log("Media seeding complete");
		});