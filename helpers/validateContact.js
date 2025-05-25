const validator = require('node-input-validator');

const saveContact = (req, res, next) => {
  const validationRules = {
    firstName: 'required|string|minLength:2|regex:^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$',
    lastName: 'required|string|minLength:2|regex:^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$',
    email: 'required|email',
    favoriteColor: 'required|string|minLength:2|regex:^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$',
    birthday: 'required|date'
  };

  const v = new validator.Validator(req.body, validationRules);

  v.check().then((matched) => {
    if (!matched) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        data: v.errors
      });
    }
    next();
  });
};

module.exports = { saveContact };