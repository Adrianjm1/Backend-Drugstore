const Joi = require('joi');

module.exports.Username = Joi.object({
    username: Joi.string().alphanum().trim().required(),
    password: Joi.string().alphanum().trim().required(),
});

module.exports.New = Joi.object({
    username: Joi.string().alphanum().trim().required(),
    password: Joi.string().alphanum().trim().required(),
    name: Joi.string().alphanum().trim().required(),
    lastname: Joi.string().alphanum().trim().required(),
    identification: Joi.number().integer().required(),
});