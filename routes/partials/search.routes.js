const express = require('express');
const searchControllers = require('../../app/controllers/frontend/search.controller');
const router = express.Router()

router
    .get('/frontend/search', searchControllers.show)
    
    module.exports = ()=> router;