const blogModel = require("../../models/blog.model");
const userModel = require("../../models/user.model");

const dashboardController ={
    show: async function (req, res) {
    
        let blog = await blogModel.find().exec();
        let user = await userModel.find().exec();

        let views = blog.reduce((accumulator, currentValue ) => {
            return accumulator + currentValue.view;
          }, 0);
        let data =await blogModel.find().sort({"view" : -1 }).limit(5).populate("creator");

      
        return res.render("backend/dashboard" , {blog,user,views, data})
   },
};

module.exports.dashboardController = dashboardController;