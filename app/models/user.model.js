const { default: mongoose } = require("mongoose");

module.exports = mongoose.model(
    'users', mongoose.Schema({
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            default: 'user',
        }
    }, 
    {
        timestamps: true,
    }
    ));