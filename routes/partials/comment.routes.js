const express = require("express");
const commentControllers = require("../../app/controllers/frontend/comment.controller");
const router = express.Router();

router
	.post("/blog/comment/:id", commentControllers.show)

module.exports = () => router;