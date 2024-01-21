
var jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
module.exports = async (server, req) => {

    const { atoken } = req.cookies;
    server.locals.checkIsAuth = false;
    server.locals.isAdmin = false;
    server.locals.user = {};
    
    if (atoken) {
        try{
            const decoded = await jwt.verify(atoken, '6fd286f7-708a-429b-b53a-2bc5272e0db6');
            server.locals.checkIsAuth = true;
            server.locals.user = decoded;

            const userRole = await userModel.findOne().where({ _id:decoded._id })
            if(userRole.role == true){
                server.locals.isAdmin = true
            }else(
                server.locals.isAdmin = false
            )
            req.session.user = decoded;
            
        } catch (error){
            server.locals.checkIsAuth = false;
            server.locals.user = {};
            console.log("wrong token")
        }  
    }

}