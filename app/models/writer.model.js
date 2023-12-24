const { default: mongoose, Schema } = require("mongoose");
const userModel = require("./user.model");

module.exports = mongoose.model('writers', mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userModel,
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true, 
}));