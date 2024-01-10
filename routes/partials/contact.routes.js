const express = require("express");
const contactControllers = require("../../app/controllers/frontend/contact.controller");
const router = express.Router();

router
.get("/contact", function (req, res) {
    return res.render("layouts/frontend/contact");
})
.post("/contact", contactControllers.submit_message)


module.exports = () => router;