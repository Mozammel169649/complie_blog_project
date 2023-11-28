const express = require('express');
const isauthMiddleware = require('../../app/middelware/isauth.middleware');
const { blogControllers } = require('../../app/controllers/backend/blog.controller');
const router = express.Router()

router
    .get('/dashboard/blog', blogControllers.all)
    .get('/dashboard/blog/create', blogControllers.create)
    .post('/dashboard/blog/create', blogControllers.store)
    .post("/dashboard/blog/from-ids", blogControllers.from_ids)
    .post("/dashboard/blog/delete-items", blogControllers.delete_items)
    .post("/dashboard/blog/set-status", blogControllers.set_status)
    .post("/dashboard/blog/published-status", blogControllers.set_published_status)
    
    .get('/dashboard/blog/:id/edit', blogControllers.edit)
    .get("/dashboard/blog/:id/delete", blogControllers.delete)
    .post("/dashboard/blog/:id", blogControllers.editSubmit)
    .get("/dashboard/blog/:id", blogControllers.show)



module.exports = () => router;