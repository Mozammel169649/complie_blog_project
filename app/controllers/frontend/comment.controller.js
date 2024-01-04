const commentModel = require("../../models/comment.model");
const { body, validationResult } = require("express-validator");

const comment_validate = async (req) => {
    await body("comment")
        .not()
        .isEmpty()
        .withMessage("the comment field is required")
        .run(req);
    await body("author")
        .not()
        .isEmpty()
        .withMessage("the author field is required")
        .run(req);
    await body("email")
        .not()
        .isEmpty()
        .withMessage("the email field is required")
        .run(req);

    let result = validationResult(req);
    return {
        errors: result.array(),
        hasError: result.isEmpty() ? false : true,
    };
};

const commentControllers = {

	show: async function (req, res) {

		let validator = await comment_validate(req);
        if (validator.hasError) {
            console.log(validator.hasError);
            return res.status(422).json(validator);
        }

		let data = {
			comment: req.body.comment,
			blog_id: req.params.id,
			writer: req.body.author,
			email: req.body.email
		}
		let comment = {};
		comment = await commentModel.create(data)

		return console.log(data)
	},
};

module.exports = commentControllers;
