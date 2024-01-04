module.exports = (req, res, next) => {
    if(req.session.user.role == true){
        next();
    }else{
        return res.redirect('/');
    }
};



