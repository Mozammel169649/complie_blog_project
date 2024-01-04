
var jwt = require('jsonwebtoken');
module.exports = async (server, req, res, next) => {

    const { atoken } = req.cookies;
    server.locals.checkIsAuth = false;
    server.locals.isAdmin = false;
    server.locals.user = {};
    
    if (atoken) {
        try{
            const decoded = await jwt.verify(atoken, '6fd286f7-708a-429b-b53a-2bc5272e0db6');
            server.locals.checkIsAuth = true;
            server.locals.user = decoded;

            server.locals.isAdmin = decoded.role == true?true:false;

            req.session.user = decoded;
        } catch (error){
            server.locals.checkIsAuth = false;
            server.locals.user = {};
            console.log("wrong token")
        }  
    }

}