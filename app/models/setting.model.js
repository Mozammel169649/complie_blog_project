const { default: mongoose, Schema } = require("mongoose");

module.exports = mongoose.model(
    "setting",
    mongoose.Schema(
        {
            title: {
                type: String,
            },
            company_name: {
                type: String,
            },
            email_account: {
                type: [new Schema({
                    email: String,
                   
                })],
            },
            mobile_number: {
                type: [new Schema({
                    number: String,
                   
                })],
            },
            address: {
                type: String,
            },
            about_us: {
				type: String,
				
			},
            copy_right_status: {
				type: String,
				
			},
            map: {
                type: String,
            },
            social_link: {
                type: [
                    new Schema({
                        title: String,
                        link: String,
                       
                    })
                ],
            },
            youtube_link: {
                type: [
                    new Schema({
                        channel_name: String,
                        link: String,
                       
                    })
                ],
            },

            logo: {
                type: String,
            },
        },
        {
            timestamps: true,
        }
    )
);

