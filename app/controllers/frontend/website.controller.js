const bannerModel = require("../../models/banner.model");
const blogModel = require("../../models/blog.model");
const categoryModel = require("../../models/category.model");
const commentModel = require("../../models/comment.model");
const mediaModel = require("../../models/media.model");


const websiteControllers = {
	folder_prefix: ``,
	route_prefix: ``,

	home: async function (req, res) {
		let blogs = await blogModel.find().populate('creator').populate('category');
		let recent3post = await blogModel.find().sort({ createdAt: -1 }).limit(3).populate('creator').populate('category');
		let banner = await bannerModel.find().populate('creator').populate('category');
		let media = await mediaModel.find().exec();
		let sports = await categoryModel.where({ title: "Sports" }).findOne().exec();
		let sportsBlog = await blogModel.where('category').in(sports._id).find().populate('creator').populate('category');

		let lastDaysAgo = new Date();
		lastDaysAgo.setDate(lastDaysAgo.getDate() - 30);
		let lastDaysData = await blogModel.find({ writing_date: { $gte: lastDaysAgo } },).limit(4).populate('creator').populate('category').exec();


		return res.render(`home`, {
			lastDaysData,
			media,
			blogs,
			banner,
			recent3post,
			sportsBlog
		});
	},
	
	category_post: async function (req, res) {
		let { category_id } = req.params;
		let blogs = await blogModel.where("category").in(category_id).find().populate('creator').populate('category');

		return res.render('layouts/category_post', {
			blogs
		});
	},
	
	blog_details: async function (req, res) {
		let { blogs_id } = req.params;
		let comments = await commentModel.where({ blog_id: blogs_id }).find().exec();
		let blogs = await blogModel.where({ _id: blogs_id }).findOne().populate('creator').populate('category');
		let count = blogs.view;
		blogs.view = count + 1;
		blogs.save();
		let views = blogs.view;

		return res.render('layouts/frontend/blogDiscreption', {
			blogs,
			comments,
			views
		});
	},
	banner_details: async function (req, res) {
		let { banner_id } = req.params;
		let comments = [];
		let blogs = await bannerModel.where({ _id: banner_id }).findOne().populate('creator').populate('category');
		let count = blogs.view;
		blogs.view = count + 1;
		blogs.save();
		let views = blogs.view;

		return res.render('layouts/frontend/blogDiscreption', {
			blogs,
			comments,
			views
		});
	}

};

module.exports = websiteControllers;