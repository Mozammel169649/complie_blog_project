const express = require('express');
const { mediaControllers } = require('../../app/controllers/backend/media.controller');
const router = express.Router()

router
    .get('/dashboard/media', mediaControllers.all)
    .get('/dashboard/media/create', mediaControllers.create)
    .post('/dashboard/media/create', mediaControllers.store)
    .post("/dashboard/media/from-ids", mediaControllers.from_ids)
    .post("/dashboard/media/delete-items", mediaControllers.delete_items)
    .post("/dashboard/media/set-status", mediaControllers.set_status)
    .post("/dashboard/media/published-status", mediaControllers.set_published_status)
    
    .get('/dashboard/media/:id/edit', mediaControllers.edit)
    .get("/dashboard/media/:id/delete", mediaControllers.delete)
    .post("/dashboard/media/:id", mediaControllers.editSubmit)
    .get("/dashboard/media/:id", mediaControllers.show)



module.exports = () => router;