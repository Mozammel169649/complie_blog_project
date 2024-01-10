const express = require('express');
const isauthMiddleware = require('../../app/middelware/isauth.middleware');
const userModel = require('../../app/models/user.model');
const router = express.Router()

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

router
    .post('/signUp-submit', async function (req, res) {
        const { userName, email, password, password_confirmation } = req.body;
        let user = req.body;
        let error = {};
        req.session.old = req.body;

        if (!userName || !email || !password || !password_confirmation) {
            if (!userName) {
                error.userName = "User Name is required"
            }
            if (!email) {
                error.email = "Email is required"
            }
            if (!password) {
                error.password = "Passworde is required"
            }
            if (!password_confirmation) {
                error.password_confirmation = "Password_confirmation is required"
            }
            req.session.error = error;
            return res.redirect("/register")
        }
        if (password != password_confirmation) {
            error.password_confirmation = "password does not matched"
            req.session.error = error;
            return res.redirect("/register")
        }
        const Data = new userModel({
            userName: userName,
            email: email,
            password: await bcrypt.hash(password, 12)
        });
        await Data.save();
        req.session.isAuth = true;
        req.session.user = user;
        let prev_url = req.session.prev_auth_url;
        if (prev_url) {
            delete req.session.prev_auth_url;
            if (prev_url != '/favicon.ico') {
                return res.redirect(prev_url);
            }
        }
        res.redirect('/dashboard');
    })

    .post('/login-submit', async function (req, res) {
        const { email, password } = req.body;
        let login_error = {};
        req.session.login_old = req.body;

        if (!email || !password) {
            if (!email) {
                login_error.email = "Email is required!"
            }
            if (!password) {
                login_error.password = "password is required!"
            }
            req.session.login_error = login_error;
            return res.redirect("/login");
        }

        let user = await userModel.where({ email: email }).findOne();
        if (user) {
            let passMatch = await bcrypt.compare(password, user.password);
            if (passMatch) {
                req.session.isAuth = true;
                req.session.user = user;

                let data = {
                    userName: user.userName,
                    email: user.email,
                    _id: user._id,
                    role:user.role,
                    photo_url: '',
                    device_id: '',
                    genrate_time: '',
                };
                const token = await jwt.sign(data, '6fd286f7-708a-429b-b53a-2bc5272e0db6');
                res.cookie('atoken',token)

                
                let prev_url = req.session.prev_auth_url;
                if (prev_url) {
                    delete req.session.prev_auth_url;
                    if (prev_url != '/favicon.ico') {
                        return res.cookie('atoken',token).redirect(prev_url);
                    }
                }
                return res.redirect('/dashboard');
            }
            login_error.password = "Incurrect password !"
            req.session.login_error = login_error;
        } else {
            login_error.email = "Incurrect Email !"
            req.session.login_error = login_error;
        }

        return res.redirect("/login");

    })

    .use(isauthMiddleware())
    .get('/logout', function (req, res) {
        req.session.isAuth = false;
        req.session.user = {};
        res.cookie("atoken", "");
        res.redirect('/')
    })

module.exports = () => router;