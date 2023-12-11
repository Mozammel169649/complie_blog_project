const express = require('express');
const { bannerControllers } = require('../../app/controllers/backend/banner.controller ');
const router = express.Router()

router
    .get('/dashboard/banner', bannerControllers.all)
    .get('/dashboard/banner/create', bannerControllers.create)
    .post('/dashboard/banner/create', bannerControllers.store)
    .post("/dashboard/banner/from-ids", bannerControllers.from_ids)
    .post("/dashboard/banner/delete-items", bannerControllers.delete_items)
    .post("/dashboard/banner/set-status", bannerControllers.set_status)
    .post("/dashboard/banner/published-status", bannerControllers.set_published_status)
    
    .get('/dashboard/banner/:id/edit', bannerControllers.edit)
    .get("/dashboard/banner/:id/delete", bannerControllers.delete)
    .post("/dashboard/banner/:id", bannerControllers.editSubmit)
    .get("/dashboard/banner/:id", bannerControllers.show)

module.exports = () => router;