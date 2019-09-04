import Joi from "@hapi/joi";

export default {
  token: Joi.string().required(),
  login: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  },
  refreshToken: {
    body: Joi.object({
      refreshToken: Joi.string().required()
    })
  }
};
