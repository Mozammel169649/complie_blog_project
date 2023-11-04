const session = require("express-session");
const translatorModel = require("../../models/translator.model");

const translatorControllers = {
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

      let data = await translatorModel
         .where(
            {
               name: { $regex: key, $options: 'i' }
            },
         )
         .find()
         .limit(limit)
         .skip(skip)
         .populate("creator");

         let count = await translatorModel.count();
      return res.render("backend/translator_management/all", { count , data, limit, page, skip  })
   },
   create: async function (req, res) {
      return res.render("backend/translator_management/create")
   },
   store: async function (req, res) {
      let data = {
         name: req.body.name,
         creator: req.session.user._id
      }
      await translatorModel.create(data)
      return res.redirect("/dashboard/translator");
   },
   edit: async function (req, res) {
      let data = await translatorModel.where({ _id: req.params.id }).findOne();
      return res.render("backend/translator_management/edit", { data })
   },
   editSubmit: async function (req, res) {
      let data = {
         name: req.body.name,
         creator: req.session.user._id
      };
      let Updatede_data = await translatorModel.where({ _id: req.params.id }).findOne().exec();

      Updatede_data.name = data.name;
      Updatede_data.creator = data.creator;
      Updatede_data.save();

      return res.redirect("/dashboard/translator");
   },
   show: async function (req, res) {
      let data = await translatorModel.where({ _id: req.params.id }).findOne().populate("creator").exec();
      return res.render("backend/translator_management/show", { data })
   },
   delet: async function (req, res) {

      await translatorModel.deleteOne().where({ _id: req.params.id }).exec();
      return res.redirect("/dashboard/translator");
   },
   set_status: async function (req, res) {
      let { status, id } = req.body;
      let response = await translatorModel.updateOne({ _id: id }, { status: status }).exec();
      return res.status(200).json(response);
   },
   deletSelectedItem: async function (req, res) {
      let select_items = req.body.selectItems;
      await translatorModel.where('_id').in(select_items).deleteMany().exec();
      return res.redirect("/dashboard/translator");
   },
   export_items: async function (req, res) {
      let select_items = req.body.selectItems;
      let category = await translatorModel.where('_id').in(select_items).find().populate("creator").exec();
      return res.status(200).json(category);
   }
}

module.exports.translatorControllers = translatorControllers;