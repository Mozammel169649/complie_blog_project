const { default: mongoose, Schema } = require("mongoose");

const { db_url } = require("../../../configs/db.config");
const settingModel = require("../setting.model");


const demo_setting = async () => {
    return {
        title: ',kjuhnnnnnnnnnnnnnnnnnnnnnm',
        company_name: 'yujyyjgfjgj',
        mobile_number: [{number:'098765432'}, {number:'098765432'}, {number:'098765432'}],
        email_account: [{email:'mozamme@gmail.com'}, {email:'mozamme@gmai2.com'}, {email:'mozamme@gmai3.com'}],
        address: 'west jafarpur, Lakshmipur Sadar, Lakshmipur, Bangladesh',
        map: 'xrereCTDFEQ.[A;TNBGJIQ;.[A NJP,FLX;[SW HNJ',
        about_us: "Mauris mattis auctor cursus. Phasellus tellus tellus, imperdiet ut imperdiet eu, iaculis a sem imperdiet ut imperdiet.",
        copy_right_status :"© Copyright 2019 Jellywp. All Rights Reserved Powered by Jellywp",
        social_link:[{
            title:'facebook',
            link:'acebook.com',
        },{
            title:'instagram',
            link:'instagram.com',
        }],
        youtube_link:[{
            title:'hungry_coder',
            link:'youtube.com/hungrycoder',
        },{
            title:'tech park IT',
            link:'youtube.com/techparkit',
        }],
		logo: "images/1.jpg",
    };
}

module.exports = () =>
    mongoose.connect(db_url)
        .then(async () => {

            await settingModel.deleteMany({});
            await settingModel.create(await demo_setting());

            console.log("setting seeding complete");
        });