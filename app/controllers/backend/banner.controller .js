const categoryModel = require("../../models/category.model");
const translatorModel = require("../../models/translator.model");
const writerModel = require("../../models/writer.model");
const { body, validationResult } = require("express-validator");
var fs = require('fs-extra');
const { dirname } = require('path');
const bannerModel = require("../../models/banner.model");
const appDir = dirname(require.main.filename);


const blog_store_validate = async (req) => {
    await body("title")
        .not()
        .isEmpty()
        .withMessage("the title field is required")
        .run(req);

    await body("category")
        .not()
        .isEmpty()
        .withMessage("the category field is required")
        .run(req);

    await body("writing_date")
        .not()
        .isEmpty()
        .withMessage("the writing date field is required")
        .run(req);

    let result = validationResult(req);
    return {
        errors: result.array(),
        hasError: result.isEmpty() ? false : true,
    };
};

const upload_files = (file, id) => {
    let file_name = parseInt(Math.random() * 1000) + id + file.name;

    const path = appDir + "/public/uploads/posts/" + file_name;
    fs.move(file.path, path, function (err) {
        if (err) return console.error(err)
        console.log("success!")
    })
    thumb_image_path = "uploads/posts/" + file_name;
    return thumb_image_path;
}
 
const bannerControllers = {
    folder_prefix: `banner_management`,
    route_prefix: `banner`,
    all: async function (req, res) {
        let page = 1;
        let skip = 0;
        let limit = 10;
        let key = "";

        if (req.query.key) {
            key = req.query.key;
        }

        if (req.query.limit && req.query.limit > 0) {
            limit = parseInt(req.query.limit);
        }

        if (req.query.page && req.query.page > 0) {
            page = parseInt(req.query.page);
            skip = page * limit - limit;
        }

        let data = await bannerModel
            .where(
                {
                    title: { $regex: key, $options: 'i' }
                },
            )
            .find()
            .limit(limit)
            .skip(skip)
            .populate('creator');

        let count = await bannerModel.count();
        return res.render(`backend/${bannerControllers.folder_prefix}/all`, { data, count, page, limit, key });
    },
    create: async function (req, res) {
        const categories = await categoryModel.find();
        return res.render(`backend/${bannerControllers.folder_prefix}/create`, { categories});
    },
    store: async function (req, res) {


        let validator = await blog_store_validate(req);
        if (validator.hasError) {
            console.log(validator.hasError);
            return res.status(422).json(validator);
        }

        let data = {
            title: req.body.title,
            category: req.body["category"],
            writing_date: req.body.writing_date,
            creator: req.session.user._id,
            blog_link: req.body.blog_link,
        };

        let  banner = {};
        try {
             banner = await bannerModel.create(data);
          
            var thumb_image_path = "";
           

            if (req.files?.thumb_image && req.files?.thumb_image.size) {
                thumb_image_path = upload_files(req.files.thumb_image,  banner._id)
            }


             banner.thumb_image = thumb_image_path;
             banner.save();

        } catch (error) {

            return res.status(500).json({ msg: "data uploading failed.", error: error })
        }


        return res.redirect(`/dashboard/${bannerControllers.route_prefix}`);
    },
    show: async function (req, res) {
        let data = await bannerModel.where({ _id: req.params.id }).findOne().populate("category");
        let date = new Date(data.writing_date);
        let writing_date = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,"0")}-${(date.getDate()).toString().padStart(2,'0')}`;
        return res.render(`backend/${bannerControllers.folder_prefix}/show`, { data , writing_date});
    },
    edit: async function (req, res) {
        const categories = await categoryModel.find();
        let data = await bannerModel.findOne().where({ _id: req.params.id });
        return res.render(`backend/${bannerControllers.folder_prefix}/edit`, { data, categories});
    },
    editSubmit: async function (req, res) {

        let validator = await blog_store_validate(req);
        if (validator.hasError) {
            console.log(validator.hasError);
            return res.status(422).json(validator);
        }
        console.log(req);

        let data = {
            title: req.body.title,
            category: req.body["category"],
            writing_date: req.body.writing_date,
            creator: req.session.user._id,
            blog_link: req.body.blog_link,
        };


        let  banner = {};
        try {
             banner = await bannerModel.findOneAndUpdate({ _id: req.params.id }, data).exec();
        
            var thumb_image_path =  banner.thumb_image || "";
            if (req.files?.thumb_image && req.files?.thumb_image.size) {
                thumb_image_path = upload_files(req.files.thumb_image,  banner._id)
                
             banner.thumb_image = thumb_image_path;
             banner.save();

            }

        } catch (error) {
            return res.status(500).json({ msg: "data uploading failed.", error: error })
        }
        return res.json(banner);
    },
    delete: async function (req, res) {
        await bannerModel.deleteOne().where({ _id: req.params.id });
        return res.redirect(`/dashboard/${bannerControllers.route_prefix}`);
    },
    from_ids: async function (req, res) {
        let in_ids = req.body.in_ids; // it alwayse take a object [{},{}] , its a array
        let categories = await bannerModel.where("_id").in(in_ids).find().populate('creator').exec();
        return res.status(200).json(categories);
    },
    delete_items: async function (req, res) {
        let selected_items = req.body.in_ids;
        let categories = await bannerModel.where('_id').in(selected_items).deleteMany().exec();
        return res.status(200).json(categories);
    },
    set_status: async function (req, res) {
        let { status, id } = req.body;
        let responce = await bannerModel.updateOne({ _id: id }, { status: status }).exec();
        return res.status(200).json(responce);
    },
    set_published_status: async function (req, res) {
        let { status, id } = req.body;
        let responce = await bannerModel.updateOne({ _id: id }, { published: status }).exec();
        return res.status(200).json(responce);
    }

}


module.exports.bannerControllers = bannerControllers;