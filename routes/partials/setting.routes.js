const express = require('express');
const { settingController } = require('../../app/controllers/backend/setting.controller');
const router = express.Router()

router
    .get('/dashboard/setting', settingController.create)
    .post('/dashboard/setting/:id', settingController.store)
    
    module.exports = ()=> router;