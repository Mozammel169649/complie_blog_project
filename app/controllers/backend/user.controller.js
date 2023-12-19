const categoryModel = require("../../models/category.model");
const blogModel = require("../../models/blog.model");
const translatorModel = require("../../models/translator.model");
const writerModel = require("../../models/writer.model");
const { body, validationResult } = require("express-validator");
var fs = require('fs-extra');
const { dirname } = require('path');
const userModel = require("../../models/user.model");
const appDir = dirname(require.main.filename);

const userControllers = {
    folder_prefix: `user_management`,
    route_prefix: `user`,
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

        let data = await userModel
            .where(
                {
                    userName: { $regex: key, $options: 'i' }
                },
            ).or(
                {
                    email: { $regex: key, $options: 'i' }
                },
            )
            .find()
            .limit(limit)
            .skip(skip).exec();

        let count = await userModel.count();
        console.log(data, count);
        return res.render(`backend/${userControllers.folder_prefix}/all`, { data, count, page, limit, key });
    },
    // store: async function (req, res) {

    //     let validator = await blog_store_validate(req);
    //     if (validator.hasError) {
    //         console.log(validator.hasError);
    //         return res.status(422).json(validator);
    //     }

    //     let data = {
    //         title: req.body.title,
    //         short_description: req.body.short_description,
    //         description: req.body.description,
    //         category: req.body["category"],
    //         writer: req.body.writer,
    //         writing_date: req.body.writing_date,
    //         translator: req.body["translators"],
    //         published: req.body.published,
    //         status: true,
    //         view: 0,
    //         seo_title: req.body.seo_title,
    //         seo_description: req.body.seo_description,
    //         seo_keyword: req.body.seo_keyword,
    //         tags: req.body["tags"],
    //         creator: req.session.user._id,
    //     };

    //     let blog = {};
    //     try {
    //         blog = await blogModel.create(data);

    //         var thumb_image_path = "";
    //         var related_image_path = [];
    //         console.log(req.files);

    //         if (req.files?.thumb_image && req.files?.thumb_image.size) {
    //             thumb_image_path = upload_files(req.files.thumb_image, blog._id)
    //         }

    //         if (req.files?.related_images && req.files?.related_images[0].size) {
    //             related_image_path = req.files.related_images.map((file) => upload_files(file, blog._id));
    //         }

    //         blog.thumb_image = thumb_image_path;
    //         blog.related_images = related_image_path;
    //         blog.save();

    //     } catch (error) {

    //         return res.status(500).json({ msg: "data uploading failed.", error: error })
    //     }
    //     return res.redirect(`/dashboard/${blogControllers.route_prefix}`);
    // },

    show: async function (req, res) {
        let data = await userModel.findOne().where({ _id: req.params.id });
        return res.render(`backend/${userControllers.folder_prefix}/show`, { data });
    },

    delete: async function (req, res) {
        await userModel.deleteOne().where({ _id: req.params.id });
        return res.redirect(`/dashboard/${userControllers.route_prefix}`);
    },

    // from_ids: async function (req, res) {
    //     let in_ids = req.body.in_ids; // it alwayse take a object [{},{}] , its a array
    //     let categories = await blogModel.where("_id").in(in_ids).find().populate('creator').exec();
    //     return res.status(200).json(categories);
    // },

    delete_items: async function (req, res) {
        let selected_items = req.body.in_ids;
        let categories = await userModel.where('_id').in(selected_items).deleteMany().exec();
        return res.status(200).json(categories);
    },

    set_role: async function (req, res) {
        let { status, id } = req.body;
        let responce = await userModel.updateOne({ _id: id }, { role: status }).exec();
        return res.status(200).json(responce);
    }

}


module.exports.userControllers = userControllers;