const session = require("express-session");
const categoryModel = require("../../models/category.model");

const categoryControllers = {

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

        let data = await categoryModel
            .where(
                {
                    title: { $regex: key, $options: 'i' }
                },
            )
            .find()
            .limit(limit)
            .skip(skip)
            .populate("creator");

        let count = await categoryModel.count();
        return res.render("backend/category_management/all", { data, count, page, limit, key });
    },
    create: function (req, res) {
        return res.render("backend/category_management/create");
    },
    store: async function (req, res) {
        let data = {
            title: req.body.title,
            creator: req.session.user._id
        }
        await categoryModel.create(data);
        return res.redirect("/dashboard/category");
    },
    show: async function (req, res) {
        let data = await categoryModel.findOne().populate("creator").where({ _id: req.params.id });
        return res.render("backend/category_management/show", { data });
    },
    edit: async function (req, res) {
        let data = await categoryModel.findOne().where({ _id: req.params.id });
        return res.render("backend/category_management/edit", { data });
    },
    editSubmit: async function (req, res) {
        let data = {
            title: req.body.title,
            creator: req.session.user._id
        }
        let category = await categoryModel.findOne().where({ _id: req.params.id });
        category.title = data.title;
        category.creator = data.creator;
        category.save();

        return res.redirect("/dashboard/category");
    },
    delete: async function (req, res) {
        await categoryModel.deleteOne().where({ _id: req.params.id });
        return res.redirect("/dashboard/category");
    },
    
    from_ids: async function (req, res){
		let in_ids = req.body.in_ids; // it alwayse take a object [{},{}] , its a array
		let categories = await categoryModel.where("_id").in(in_ids).find().populate('creator').exec();
		return res.status(200).json(categories);
	},
    delete_items:async function(req, res){
        let selected_items = req.body.in_ids;
        let categories = await categoryModel.where('_id').in(selected_items).deleteMany().exec();
        return res.status(200).json(categories);
    },
    set_status: async function(req,res){
        let { status, id} = req.body;
        let responce = await categoryModel.updateOne({_id:id},{status:status}).exec();
        return res.status(200).json(responce);
    }

}


module.exports.categoryControllers = categoryControllers;