const contactModel = require("../../models/contact.model");

const messageController ={
    show_message: async function (req, res) {

        let message = await contactModel.find().exec();
    
        return res.render("backend/show_message", { message } )
   },
};

module.exports.messageController = messageController;