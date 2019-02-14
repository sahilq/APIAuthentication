//middleware for server side validation

const Joi = require("joi");
//Joi.objectId for mongodb Object Id validation
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res
          .status(400)
          .json(`${result.error.details[0].path} is required`);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }),
    regSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string().required(),
      password: Joi.string().required()
    }),
    postSchema: Joi.object().keys({
      title: Joi.string().required(),
      article: Joi.string().required(),
      userId: Joi.objectId().required(),
      userName: Joi.string().required()
    }),
    commentSchema: Joi.object().keys({
      postId: Joi.objectId().required(),
      userId: Joi.objectId().required(),
      userName: Joi.string().required(),
      body: Joi.string().required()
    })
  }
};
