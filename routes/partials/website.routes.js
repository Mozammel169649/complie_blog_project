const express = require('express');
const websiteControllers = require('../../app/controllers/frontend/website.controller');
const categoryModel = require('../../app/models/category.model');
const settingModel = require('../../app/models/setting.model');
const router = express.Router()

router
    .get('/', websiteControllers.home)
	.get("/category/:category_name/:category_id", websiteControllers.category_post)
	.get("/blog/:blogs_id", websiteControllers.blog_details)
	.get("/banner/:banner_id", websiteControllers.banner_details)

    
	.get("/about", async function (req, res) {
		let categories = await categoryModel.find().exec();
		let setting = await settingModel.find().exec();
		return res.render("about" ,{categories ,setting});
	})
	.get("/login", function (req, res) {
		return res.render("auth/login");
	})
	.get("/signup", function (req, res) {
		return res.render("auth/register");
	})


module.exports = () => router;