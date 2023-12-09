const settingModel = require("../../models/setting.model");
var fs = require('fs-extra');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const upload_files = (file, id) => {
    let file_name = parseInt(Math.random() * 1000) + id + file.name;

    const path = appDir + "/public/uploads/posts/" + file_name;
    fs.move(file.path, path, function (err) {
        if (err) return console.error(err)
        console.log("success!")
    })
    logo_path = "uploads/posts/" + file_name;
    return logo_path;
}


const settingController = {
    create: async function (req, res) {
        let data = await settingModel.find().exec();
        // console.log(data)
        return res.render("backend/setting_management/create", {data})
    },
    store: async function (req, res) {
               let id = req. params.id;
        let data = {
            title:         req.body.title,
            company_name:  req.body.company_name,
            mobile_number: req.body. mobile_number,
            social_link:   req.body.social_link,
            youtube_link:  req.body.youtube_link,
            email_account: req.body.email_account,
            address:       req.body.address,
            map:           req.body.map,
            about_us:      req.body.about_us,
            copy_right_status:      req.body.copy_right_status,
        };
        

        let setting = {};
        try {
            setting = await settingModel.findOneAndUpdate({ _id: id }, data).exec();;
            var logo = "";

            if (req.files?.logo && req.files?.logo.size) {
                logo = upload_files(req.files.logo, setting._id)
            }
            setting.logo = logo;
            setting.save();

        } catch (error) {

            return res.status(500).json({ msg: "data uploading failed.", error: error })
        }

        return console.log("setting data successfuly updated");
    },
};

module.exports.settingController = settingController;