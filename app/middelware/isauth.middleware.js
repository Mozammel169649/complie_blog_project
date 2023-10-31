const isAuth = async (req, res, next)=>{
    const { atoken } = req.cookies;
    if (atoken) {
        try{
            await jwt.verify(atoken, '6fd286f7-708a-429b-b53a-2bc5272e0db6');
            req.session.isAuth = true;
        } catch (error){
            req.session.isAuth = true;
        }  
    }

    if(req.session.isAuth){
        next();
    }else{
        if(/^[^.]*$/.test(req.originalUrl)){
			req.session.prev_auth_url = req.originalUrl;
		}
        return res.redirect('/login')
    }
}

module.exports = () => isAuth ; 