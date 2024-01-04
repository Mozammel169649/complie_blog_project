const { render } = require("ejs");
const writerModel = require("../../models/writer.model");

const writerController = {
     all: async function (req, res) {
          let limit = 10;
          let skip = 0;
          let page = 1;
          let key = "";

          if (req.query.key) {
               key = req.query.key;
          }

          if (req.query.limit && req.query.limit > 0) {
               limit = parseInt(req.query.limit);
          }

          if (req.query.page && req.query.page > 0) {
               page = parseInt(req.query.page);
               skip = page * limit - limit;
          }


          let data = await writerModel
               .where(
                    {
                         name: { $regex: key, $options: 'i' }
                    }
               ).find()
               .limit(limit)
               .skip(skip)
               .populate("creator");
          let count = await writerModel.count();
          return res.render("backend/writer_management/all", {count , data, limit, page, skip });
     },
     edit: async function (req, res) {
          let data = await writerModel.where({ _id: req.params.id }).findOne().exec();
          return res.render("backend/writer_management/edit", { data })
     },
     editSubmit: async function (req, res) {
          let data = {
               writer: req.body.name,
               creator: req.session.user._id
          }
          let update_writer = await writerModel.where({ _id: req.params.id }).findOne().exec();
          update_writer.creator = data.creator;
          update_writer.name = data.writer;
          update_writer.save();
          return res.redirect("/dashboard/writer/all");
     },
     show: async function (req, res) {
          let data = await writerModel.where({ _id: req.params.id }).findOne().populate("creator");
          console.log(data);
          return res.render("backend/writer_management/show", { data })
     },
     delete: async function (req, res) {
          await writerModel.deleteOne().where({ _id: req.params.id });
          return res.redirect("/dashboard/writer/all")
     },
     create: function (req, res) {
          return res.render("backend/writer_management/create")
     },
     store: async function (req, res) {
          let data = {
               name: req.body.name,
               creator: req.session.user._id
          }
          console.log(data)
          await writerModel.create(data);
          return res.redirect("/dashboard/writer/all")
     },
     set_status: async function (req, res) {
          let { id, status } = req.body;
          let responce = await writerModel.updateOne({ _id: id }, { status: status }).exec();
          return res.status(200).json(responce);
     },
     deletSelectedItem: async function (req, res) {
          let select_items = req.body.selectItems;
          await writerModel.where('_id').in(select_items).deleteMany().exec();
          return res.redirect("/dashboard/translator");
     },
     export_items: async function (req, res) {
          let select_items = req.body.selectItems;
          let category = await writerModel.where('_id').in(select_items).find().populate("creator").exec();
          return res.status(200).json(category);
     }

}

module.exports.writerController = writerController;