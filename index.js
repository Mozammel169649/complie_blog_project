const express = require('express');
const server = express();

const mongoose = require('mongoose');
const allRoutes = require('./routes/all.routes');
const checkAuthMiddleware = require("./app/middelware/checkAuth.middleware");
const { db_url } = require('./configs/db.config');
const formData = require('express-form-data');


const cookieParser = require('cookie-parser');
server.use(cookieParser());



/* express session part start */
const session = require('express-session');
server.use(express.static("public"))
/* express session part end */


/* body parser part start */

const bodyParser = require("body-parser");
const glovelMiddleware = require('./app/middelware/global.middleware');
const globalMiddleware = require('./app/middelware/global.middleware');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(formData.parse());
server.use(express.urlencoded({
    extended: true
}))

server.set('json spaces', 4);
/* body parser part end */

/* basic auth part start */
server.set('trust proxy', 1);
server.use(session({
    secret: 's3Cur3',
    name: 'sessionId'
}))
/* basic auth part end */

/* view engine part start */
server.set("view engine", "ejs")
server.set('views', './views')
/* view engine part end */


server.use(async (req, res, next) => {
    server.locals.error = {};
    server.locals.old = {};
    server.locals.setting = {};
    server.locals.recent2post = {};
    server.locals.categories = {};
    server.locals.login_error = {};
    server.locals.login_old = {};
   
    if (req.session.login_old) {
        server.locals.login_old = req.session.login_old;
        req.session.login_old = {}
    }
    if (req.session.login_error) {
        server.locals.login_error = req.session.login_error;
        req.session.login_error = {}
    }
    if (req.session.error) {
        server.locals.error = req.session.error;
        req.session.error = {};
    }
    if (req.session.old) {
        server.locals.old = req.session.old;
        req.session.old = {};
    }
    await checkAuthMiddleware(server, req, res, next);
    await globalMiddleware(server, req, res, next);
    // await checkAdminMiddleware(server, req, res, next);
    next();
})

server.use(allRoutes());


mongoose.connect(db_url)
    .then(() => {
        server.listen(5000, () => {
            console.log(`app is listening on http://127.0.0.1:5000`);
        });
    });
