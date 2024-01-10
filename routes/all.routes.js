const express = require('express')
const blogRoutes = require('./partials/blog.routes')
const userRoutes = require('./partials/user.routes')
const emailRoutes = require('./partials/email.routes')
const dashboardRoutes = require('./partials/dashboard.routes')
const authRoutes = require('./partials/auth.routes')
const websiteRoutes = require('./partials/website.routes')
const categoryRoutes = require('./partials/category.routes')
const writerRoutes = require('./partials/writer.routes')
const translatorRoutes = require('./partials/translator.routes')
const isauthMiddleware = require('../app/middelware/isauth.middleware')
const commentRoutes = require('./partials/comment.routes')
const contactRoutes = require('./partials/contact.routes')
const messageRoutes = require('./partials/message.routes')
const settingRoutes = require('./partials/setting.routes')
const searchRoutes = require('./partials/search.routes')
const bannerRoutes = require('./partials/banner.routes')
const mediaRoutes = require('./partials/media.routes')
const isauthAdminMiddleware = require('../app/middelware/isauthAdmin.middleware')



const router = express.Router()

router.use(websiteRoutes())
router.use(authRoutes())
router.use(contactRoutes())
router.use(searchRoutes())


router.use(isauthMiddleware())
router.use(commentRoutes())
router.use(messageRoutes())


router.use(isauthAdminMiddleware)
router.use(settingRoutes())
router.use(categoryRoutes())
router.use(blogRoutes())
router.use(userRoutes())
router.use(emailRoutes())
router.use(dashboardRoutes())
router.use(translatorRoutes())
router.use(writerRoutes())
router.use(bannerRoutes())
router.use(mediaRoutes())

module.exports = () => router;