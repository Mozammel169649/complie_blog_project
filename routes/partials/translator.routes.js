const express = require("express");
const { translatorControllers } = require("../../app/controllers/backend/translator.controller");
const router = express.Router();

router
    .get("/dashboard/translator", translatorControllers.all)
    .post("/dashboard/translator/set-status", translatorControllers.set_status)
    .get("/dashboard/translator/creator" , translatorControllers.create)
    .post("/dashboard/translator_submit" , translatorControllers.store)
    .post("/dashboard/translator/deletSelectedItem", translatorControllers.deletSelectedItem)
    .post("/dashboard/translator/for-Export-ids", translatorControllers.export_items)

    .get("/dashboard/translator/:id/edit", translatorControllers.edit)
    .get("/dashboard/translator/:id/show", translatorControllers.show)
    .get("/dashboard/translator/:id/delet", translatorControllers.delet)
    .post('/dashboard/translator/update-data-submit/:id' , translatorControllers.editSubmit)


module.exports = () => router;