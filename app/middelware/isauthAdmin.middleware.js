const userModel = require("../models/user.model");

module.exports = async(req, res, next) => {
    
    const user = req.session.user?._id
    const auth = await userModel.findOne().where({ _id:user })

    if(auth?.role == true){
        next()
    }else{
        return res.redirect('/');
    }
};



