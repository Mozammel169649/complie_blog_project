const express = require('express');
const { messageController } = require('../../app/controllers/backend/message.controller');
const router = express.Router()

router
    .get('/dashboard/show_message', messageController.show_message)
    
    module.exports = ()=> router;