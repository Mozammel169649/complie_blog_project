// const session = require("express-session");

module.exports = async (server, req, res, next) => {
    server.locals.isAuthadmin = false;
    if(req.session?.user.role == true){
        server.locals.isAuthadmin = true;
    }else{
        server.locals.isAuthadmin = false;        
    }
    // console.log(server.locals, req.session);
    return 0;

};