const { default: mongoose } = require("mongoose");
const { db_url } = require("../../../configs/db.config");
const userModel = require("../user.model");

let users = [
	{
		userName: "admin",
		email: "admin@gmail.com",
		password:"$2b$12$7/AEv2vyK3ezRF6tL15ws.EDOSva1qdV2W4V3z52IgXFo9eknFTH.",
		role:true,
	},
	{
		userName: "user",
		email: "user@gmail.com",
		password: "$2b$12$Zo8Spr3UNF9T0KSoWbmuTeXIj.L984HJ8Fh50Z/rmxdKnylFV13ia",
	},
];

module.exports = () =>
	mongoose.connect(db_url)
		.then(async () => {

			await userModel.deleteMany({});
			await userModel.insertMany(users);

			console.log("user seeding complete");
		});