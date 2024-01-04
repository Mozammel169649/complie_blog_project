const blogModel = require("../models/blog.model");
const categoryModel = require("../models/category.model");
const settingModel = require("../models/setting.model");

module.exports = async (server, req, res, next) => {
    let setting = await settingModel.find();		
    let recent2post = await blogModel.find().sort({createdAt : -1}).limit(2).populate('creator').populate('category');
    let categories = await categoryModel.find(); 

    let categoryView = await categoryModel.find();
	categoryView = await count_post(categoryView);

	 async function count_post(els){
		let temp = [];
		for (let index = 0; index < els.length; index++) {

			let element = els[index];
			element = { ...element }._doc;
			element.count = await blogModel.where("category").in(element._id).count().exec();
			temp.push(element)
		}
		return temp

	};

    server.locals.categoryView = categoryView ;
    server.locals.setting = setting ;
    server.locals.categories = categories ;
    server.locals.recent2post = recent2post ;

   
    
}