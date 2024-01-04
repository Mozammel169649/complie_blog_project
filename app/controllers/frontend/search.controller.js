const blogModel = require("../../models/blog.model");
const categoryModel = require("../../models/category.model");

const searchControllers = {

    show: async function (req, res) {
        let token = req.query.search;
        let categories = await categoryModel.find().exec();
        let blogs = await blogModel
        .where(
            {
                title: { $regex: token, $options: 'i' }
            },
        ).or(
            {
                description :{ $regex: token, $options: 'i' }
            },
        ).find().populate("category").exec();
        return res.render('layouts/search_post' , {
			blogs,
            categories
		});
    },
};

module.exports = searchControllers;
