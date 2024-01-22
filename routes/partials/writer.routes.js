const express = require("express");
const { writerController } = require("../../app/controllers/backend/writer.controller");
const router = express.Router();

router
    .get("/dashboard/writer/all" , writerController.all)
    .get("/dashboard/writer/:id/edit", writerController.edit)
    .get("/dashboard/writer/:id/show", writerController.show)
    .post('/dashboard/writer/update-data-submit/:id' , writerController.editSubmit)
    .get("/dashboard/writer/:id/delet", writerController.delete)

    .get("/dashboard/writer/creator" , writerController.create)
    .post("/dashboard/writer_submit" , writerController.store)
    .post("/dashboard/writer/set-status", writerController.set_status)

    .post("/dashboard/writer/deletSelectedItem", writerController.deletSelectedItem)
    .post("/dashboard/writer/for-Export-ids", writerController.export_items)
    

module.exports = () => router;


























    // .post("/dashboard/translator/deletSelectedItem", translatorControllers.deletSelectedItem)
    // .post("/dashboard/translator/for-Export-ids", translatorControllers.export_items)

