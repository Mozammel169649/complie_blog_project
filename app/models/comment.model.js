const { default: mongoose, Schema } = require("mongoose");

module.exports = mongoose.model(
    "comments",
    mongoose.Schema({
        blog_id: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        writer: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: true,
        }
    }, {
        timestamps: true,
    })
);
