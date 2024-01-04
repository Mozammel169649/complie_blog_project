const session = require("express-session");
const categoryModel = require("../../models/category.model");
const blogModel = require("../../models/blog.model");
const translatorModel = require("../../models/translator.model");
const writerModel = require("../../models/writer.model");

const { body, validationResult } = require("express-validator");
var fs = require('fs-extra');
const { dirname } = require('path');
const { log } = require("console");
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

    await body("writer")
        .not()
        .isEmpty()
        .withMessage("the writer field is required")
        .run(req);

    await body("writing_date")
        .not()
        .isEmpty()
        .withMessage("the writing date field is required")
        .run(req);

    // await body("short_description")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the short description field is required")
    //     .run(req);

    // await body("description")
    //     .not()
    //     .isEmpty()
    //     .withMessage("the description field is required")
    //     .run(req);

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

const blogControllers = {
    folder_prefix: `blog_management`,
    route_prefix: `blog`,
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

        let data = await blogModel
            .where(
                {
                    title: { $regex: key, $options: 'i' }
                },
            )
            .find()
            .limit(limit)
            .skip(skip)
            .populate("creator");

        let count = await blogModel.count();
        return res.render(`backend/${blogControllers.folder_prefix}/all`, { data, count, page, limit, key });
    },
    create: async function (req, res) {
        const categories = await categoryModel.find();
        const translators = await translatorModel.find();
        const writers = await writerModel.find();
        return res.render(`backend/${blogControllers.folder_prefix}/create`, { categories, translators, writers });
    },
    store: async function (req, res) {


        let validator = await blog_store_validate(req);
        if (validator.hasError) {
            console.log(validator.hasError);
            return res.status(422).json(validator);
        }

        let data = {
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description,
            category: req.body["category"],
            writer: req.body.writer,
            writing_date: req.body.writing_date,
            translator: req.body["translators"],
            published: req.body.published,
            status: true,
            view: 0,
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_keyword: req.body.seo_keyword,
            tags: req.body["tags"],
            creator: req.session.user._id,
        };

        let blog = {};
        try {
            blog = await blogModel.create(data);
          
            var thumb_image_path = "";
            var related_image_path = [];
            console.log(req.files);

            if (req.files?.thumb_image && req.files?.thumb_image.size) {
                thumb_image_path = upload_files(req.files.thumb_image, blog._id)
            }

            if (req.files?.related_images && req.files?.related_images[0].size) {
                related_image_path = req.files.related_images.map((file) => upload_files(file, blog._id));
            }

            blog.thumb_image = thumb_image_path;
            blog.related_images = related_image_path;
            blog.save();

        } catch (error) {

            return res.status(500).json({ msg: "data uploading failed.", error: error })
        }


        return res.redirect(`/dashboard/${blogControllers.route_prefix}`);
    },

    show: async function (req, res) {
        let data = await blogModel.findOne().populate("creator").populate("writer").populate("translator").populate("category").where({ _id: req.params.id });
        let date = new Date(data.writing_date);
        let writing_date = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,"0")}-${(date.getDate()).toString().padStart(2,'0')}`;
        return res.render(`backend/${blogControllers.folder_prefix}/show`, { data , writing_date});
    },

    edit: async function (req, res) {
        const categories = await categoryModel.find();
        const translators = await translatorModel.find();
        const writers = await writerModel.find();
        let data = await blogModel.findOne().where({ _id: req.params.id });
        return res.render(`backend/${blogControllers.folder_prefix}/edit`, { data, categories, translators, writers });
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
            short_description: req.body.short_description,
            description: req.body.description,
            category: req.body["category"],
            writer: req.body.writer,
            writing_date: req.body.writing_date,
            translator: req.body["translators"],
            published: req.body.published,
            status: true,
            view: 0,
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_keyword: req.body.seo_keyword,
            tags: req.body["tags"],
            creator: req.session.user._id,
        };
        console.log(data);

        let blog = {};
        try {
            blog = await blogModel.findOneAndUpdate({ _id: req.params.id }, data).exec();
        
            var thumb_image_path = blog.thumb_image || "";
            var related_image_path = blog.related_images || [];

            if (req.files?.thumb_image && req.files?.thumb_image.size) {
                thumb_image_path = upload_files(req.files.thumb_image, blog._id)
            }

            if (req.files?.related_images && req.files?.related_images[0].size) {
                related_image_path = req.files.related_images.map((file) => upload_files(file, blog._id));
            }

            blog.thumb_image = thumb_image_path;
            blog.related_images = related_image_path;
            blog.save();

        } catch (error) {
            return res.status(500).json({ msg: "data uploading failed.", error: error })
        }

        return res.json(blog);
    },

    delete: async function (req, res) {
        await blogModel.deleteOne().where({ _id: req.params.id });
        return res.redirect(`/dashboard/${blogControllers.route_prefix}`);
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


module.exports.blogControllers = blogControllers;