
const contactModel = require("../../models/contact.model");


// const comment_validate = async (req) => {
//     await body("comment")
//         .not()
//         .isEmpty()
//         .withMessage("the comment field is required")
//         .run(req);
//     await body("author")
//         .not()
//         .isEmpty()
//         .withMessage("the author field is required")
//         .run(req);
//     await body("email")
//         .not()
//         .isEmpty()
//         .withMessage("the email field is required")
//         .run(req);

//     let result = validationResult(req);
//     return {
//         errors: result.array(),
//         hasError: result.isEmpty() ? false : true,
//     };
// };

const contactControllers = {

    submit_message: async function (req, res) {

        // let validator = await comment_validate(req);
        // if (validator.hasError) {
        //     console.log(validator.hasError);
        //     return res.status(422).json(validator);
        // }

        let data = {
            name: req.body.name,
            number: req.body.number,
            email_id: req.body.email,
            message: req.body.message
        }
        let message={}
        message = await contactModel.create(data)

        return res.redirect("/contact")
    },
};

module.exports = contactControllers;
