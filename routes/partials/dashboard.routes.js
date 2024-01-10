const express = require('express');
const { dashboardController } = require('../../app/controllers/backend/dashboard.controller');
const router = express.Router()

router
    .get('/dashboard', dashboardController.show)

    module.exports = () => router;