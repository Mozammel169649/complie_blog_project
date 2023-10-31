module.exports = (req, res, next) => {
    console.log(req.session.user);
    console.log("isauntAdminmiddlewere");
    if(req.session.user.role === 'admin'){
        next();
    }else{
        return res.redirect('/');
    }
};



