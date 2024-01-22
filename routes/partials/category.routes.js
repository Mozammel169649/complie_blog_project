const express = require("express");
const { categoryControllers } = require("../../app/controllers/backend/category.controller");
const router = express.Router();

router
	.get("/dashboard/category", categoryControllers.all)
	.post("/dashboard/category/from-ids", categoryControllers.from_ids)
	.post("/dashboard/category/delete-items", categoryControllers.delete_items)
	.post("/dashboard/category/set-status", categoryControllers.set_status)
	.get("/dashboard/category/create", categoryControllers.create)
	.post("/dashboard/category_submit", categoryControllers.store)

	.get("/dashboard/category/:id/edit", categoryControllers.edit)
	.get("/dashboard/category/:id/delete", categoryControllers.delete)
	.get("/dashboard/category/:id", categoryControllers.show)
	.post("/dashboard/category/:id", categoryControllers.editSubmit)



module.exports = () => router;