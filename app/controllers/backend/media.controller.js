
const categoryModel = require("../../models/category.model");
const blogModel = require("../../models/blog.model");
const translatorModel = require("../../models/translator.model");
const writerModel = require("../../models/writer.model");
const { body, validationResult } = require("express-validator");

const { dirname } = require('path');
const { log } = require("console");
const mediaModel = require("../../models/media.model");



const blog_store_validate = async (req) => {
    await body("title")
        .not()
        .isEmpty()
        .withMessage("the title field is required")
        .run(req);

    await body("icon")
        .not()
        .isEmpty()
        .withMessage("the icon field is required")
        .run(req);

    await body("count")
        .not()
        .isEmpty()
        .withMessage("the count field is required")
        .run(req);

    await body("unite")
        .not()
        .isEmpty()
        .withMessage("the unite field is required")
        .run(req);


    let result = validationResult(req);
    return {
        errors: result.array(),
        hasError: result.isEmpty() ? false : true,
    };
};

const mediaControllers = {
    folder_prefix: `media_management`,
    route_prefix: `media`,
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

        let data = await mediaModel
            .where(
                {
                    title: { $regex: key, $options: 'i' }
                },
            )
            .find()
            .limit(limit)
            .skip(skip);

        let count = await mediaModel.count();
        return res.render(`backend/${mediaControllers.folder_prefix}/all`, { data, count, page, limit, key });
    },
    create: async function (req, res) {
        return res.render(`backend/${mediaControllers.folder_prefix}/create`);
    },

    store: async function (req, res) {

        let validator = await blog_store_validate(req);
        if (validator.hasError) {
            console.log(validator.hasError);
            return res.status(422).json(validator);
        }

        let data = {
            title: req.body.title,
            icon: req.body.icon,
            count: req.body.count,
            unite: req.body.unite,
            link: req.body.link,
        };

        media = await mediaModel.create(data);

        return res.redirect(`/dashboard/${mediaControllers.route_prefix}`);
    },


    show: async function (req, res) {
        let data = await mediaModel.where({ _id: req.params.id }).findOne();

        return res.render(`backend/${mediaControllers.folder_prefix}/show`, { data });
    },

    edit: async function (req, res) {
        let data = await mediaModel.findOne().where({ _id: req.params.id });
        return res.render(`backend/${mediaControllers.folder_prefix}/edit`, { data });
    },
    editSubmit: async function (req, res) {

        let validator = await blog_store_validate(req);
        if (validator.hasError) {
            console.log(validator.hasError);
            return res.status(422).json(validator);
        }

        let data = {
            title: req.body.title,
            icon: req.body.icon,
            count: req.body.count,
            unite: req.body.unite,
            link: req.body.link,
        };

        let media = {};

        media = await mediaModel.findOneAndUpdate({ _id: req.params.id }, data).exec();
        return res.json(media);
    },

    delete: async function (req, res) {
        await mediaModel.deleteOne().where({ _id: req.params.id });
        return res.redirect(`/dashboard/${mediaControllers.route_prefix}`);
    },



    from_ids: async function (req, res) {
        let in_ids = req.body.in_ids; // it alwayse take a object [{},{}] , its a array
        let categories = await blogModel.where("_id").in(in_ids).find().populate('creator').exec();
        return res.status(200).json(categories);
    },
    delete_items: async function (req, res) {
        let selected_items = req.body.in_ids;
        let categories = await blogModel.where('_id').in(selected_items).deleteMany().exec();
        return res.status(200).json(categories);
    },
    set_status: async function (req, res) {
        let { status, id } = req.body;
        let responce = await blogModel.updateOne({ _id: id }, { status: status }).exec();
        return res.status(200).json(responce);
    },
    set_published_status: async function (req, res) {
        let { status, id } = req.body;
        let responce = await blogModel.updateOne({ _id: id }, { published: status }).exec();
        return res.status(200).json(responce);
    }

}


module.exports.mediaControllers = mediaControllers;