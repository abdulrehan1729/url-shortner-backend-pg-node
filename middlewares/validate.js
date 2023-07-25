const Joi = require('joi')

const validateUserRegistration = (req, res, next) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    next();
};

const validateUserLogin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    next();
};

module.exports = {
    validateUserRegistration,
    validateUserLogin
}