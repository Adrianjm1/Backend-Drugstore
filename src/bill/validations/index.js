const Joi = require('joi');


module.exports.Bil = Joi.object({
    id: Joi.number(),
    billDate: Joi.required(),
    dispatchDate:Joi.string(),
    expirationDate:Joi.string(),
    creditDays:   Joi.number(),
    daysLate:   Joi.number(),
    billNumber:   Joi.number(),
    client: Joi.string().min(0).max(30).trim().required(),
    rif:Joi.string().min(0).max(30).trim().required(),
    nota: Joi.number(),
    location: Joi.string().min(0).max(30).trim().required(),
    city: Joi.string().min(0).max(30).trim().required(),
    sellersCommission: Joi.number(),
    amountUSD: Joi.number(),
    idSeller:  Joi.number(),

});

