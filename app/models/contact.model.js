const { default: mongoose, Schema } = require("mongoose");

module.exports = mongoose.model(
    "contact",
    mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email_id: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            default: true,
        },
        message: {
            type: String,
            default: true,
        }
    }, {
        timestamps: true,
    })
);
