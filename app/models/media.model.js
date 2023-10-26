const { default: mongoose, Schema } = require("mongoose");

module.exports = mongoose.model(
	"media",
	mongoose.Schema(
		{
			title: {
				type: String,
			},
			icon: {
				type: String,
				required: true,
			},
			unite: {
				type: String,
				required: true,
			},
			count: {
				type: Number,
				default: 0,
			},
			link: {
				type: String,
			},
			
		},
		{
			timestamps: true,
		}
	)
);