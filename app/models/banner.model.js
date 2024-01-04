const { default: mongoose, Schema } = require("mongoose");
const userModel = require("./user.model");
const categoryModel = require("./category.model");

module.exports = mongoose.model(
	"banner",
	mongoose.Schema(
		{
			title: {
				type: String,
				required: true,
			},
			category: {
				type: [Schema.Types.ObjectId],
				required: true,
				ref: categoryModel,
			},
			creator: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: userModel,
			},
			writing_date: {
				type: Date,
				default: Date.now,
			},
			blog_link: {
				type: String,
			},
			thumb_image: {
				type: String,
				// required: true,
			},
		},
		{
			timestamps: true,
		}
	)
);