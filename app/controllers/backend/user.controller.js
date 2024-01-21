const categoryModel = require("../../models/category.model");
const blogModel = require("../../models/blog.model");
const translatorModel = require("../../models/translator.model");
const writerModel = require("../../models/writer.model");
const { body, validationResult } = require("express-validator");
var fs = require('fs-extra');
const { dirname } = require('path');
const userModel = require("../../models/user.model");
const session = require("express-session");
const appDir = dirname(require.main.filename);

const userControllers = {
    folder_prefix: `user_management`,
    route_prefix: `users`,
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
    show: async function (req, res) {
        let data = await userModel.findOne().where({ _id: req.params.id });
        return res.render(`backend/${userControllers.folder_prefix}/show`, { data });
    },

    delete: async function (req, res) {
        await userModel.deleteOne().where({ _id: req.params.id });
        return res.redirect(`/dashboard/${userControllers.route_prefix}`);
    },

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